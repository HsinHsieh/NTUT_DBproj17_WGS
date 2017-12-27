// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var url = new URL(window.location.href);
  var OriginalOID = url.searchParams.get("OID");
  var tempPrice;
  var productAutoComplete = {
    url: "api/productAllSearch",
    getValue: "PID",
    list: {
      match: {
        enabled: true
      }
    },

    template: {
      type: "custom",
      method: function(value, item) {
        return value + " | " + item.Product_Name;
      }
    }

  };
  $("#order_content_Item").easyAutocomplete(productAutoComplete);
  var searchOrderMain = function(msg) {
    var resObj = JSON.parse(msg);
    $('#orderEdit_OID').val(resObj[0].OID);
    $('#orderEdit_customer').val(resObj[0].Customer);
    $('#orderEdit_discount').val(resObj[0].Discount);
    $('#orderEdit_status').val(resObj[0].Status);
    $('#orderEdit_price').val(resObj[0].Total_Price);
    $('#orderEdit_date').val(resObj[0].Order_Time);
  }
  var contentRow = function(msg) {
    var resStr = "";
    var resObj = JSON.parse(msg);
    //$("#productSearch_catagory").reset();
    tempPrice = 0
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      resStr += "'<tr><th scope='row'>" + (i + 1) + "</th><td><a href='/admin/product_edit?PID=" + resObj[i].Item + "' target='_blank' >" + resObj[i].Item + "</a></th><td>" + resObj[i].Price + "</td><td>" + resObj[i].License_Key + "</td><td><button class='btn btn-danger' type='button' id='orderCDeleteButton' data-toggle=\"modal\" data-target='#orderContentDeleteModal' data-ocid='" + resObj[i].OCID + "' data-item='" + resObj[i].Item + "'>刪除</button></td></tr>";
      tempPrice += resObj[i].Price;
    }
    $(".orderContent_list").html(resStr);
    calculatePrice();
  }
  var calculatePrice = function() {
    $("#orderEdit_price").val(tempPrice - $("#orderEdit_discount").val());
  }
  var editResult = function(msg) {
    var resObj = JSON.parse(msg);
    if ('errno' in resObj) {
      $('#orderEditModalTitle').html("操作結果");
      $('#orderEditModalBody').html("更改作業失敗!!<br>錯誤代碼：" + resObj.errno + "<br>錯誤訊息：" + resObj.sqlMessage);
      $('#orderEditModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">再試一次</button><button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\"  onclick=\"location.href = '/admin';\">確認</button>")

    } else {
      $('#orderEditModalTitle').html("操作結果");
      $('#orderEditModalBody').html("更改作業完成");
      $('#orderEditModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">再次更改</button><button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" onclick=\"location.href = '/admin';\">確認</button>")
    }
    $("#orderEditModal").modal({
      show: true
    });
  }

  var addResult = function(msg) {
    var resObj = JSON.parse(msg);
    if ('errno' in resObj) {
      $('.operationResult').html("<div class='alert alert-danger alert-dismissible'><div id='alertContent'>" + '刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage + "</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")

      $('#alertContent').html('作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage);
    } else {
      $('.operationResult').html("<div class='alert alert-success alert-dismissible'><div id='alertContent'>操作完成!!</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")
    }
    $('.alert').alert();
  }
  $("#orderEdit_discount").change(calculatePrice);
  // Get('/admin/api/productCatagory', searchCatagory);
  Get('/admin/api/orderEditMain/' + OriginalOID, searchOrderMain);
  Get('/admin/api/orderEditContent/' + OriginalOID, contentRow);
  $("#order_edit_submit").click(function() {
    var data = {
      "OID": ($('#orderEdit_OID').val()),
      "Customer": ($('#orderEdit_customer').val()),
      "Discount": ($('#orderEdit_discount').val()),
      "Status": ($('#orderEdit_status').val()),
      "Price": ($('#orderEdit_price').val()),
    };
    Post('/admin/api/orderEdit', data, editResult);
  });

  $("#order_content_add").click(function() {
    $("#order_content_Item").val("");
    //Post('/admin/api/orderContentAdd', data, editResult);
  });
  $('#order_content_submit').click(function() {
    var data = {
      "OID": (OriginalOID),
      "Item": ($('#order_content_Item').val()),
    };
    Post('/admin/api/orderContentAdd', data, addResult);
    Get('/admin/api/orderEditContent/' + OriginalOID, contentRow);
    $('#orderContentAddModal').modal('hide');
  });
  $('#orderContentDeleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var ocid = button.data('ocid');
    var item = button.data('item');
    var modal = $(this);
    $('#orderContentDeleteModalBody').html("是否確認刪除以品項??<br>品項編號 : " + ocid + "<br>商品編號 : " + item);
    $("#order_content_delete_ocid").val(ocid);
  });

  $('#order_content_delete_confirm').click(function() {
    var ocid = $('#order_content_delete_ocid').val()
    Get('/admin/api/orderContentDelete/' + ocid, addResult);
    Get('/admin/api/orderEditContent/' + OriginalOID, contentRow);
    $('#orderContentDeleteModal').modal('hide');
  });

});