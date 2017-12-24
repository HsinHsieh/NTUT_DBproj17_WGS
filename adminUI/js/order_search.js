$(document).ready(function() {
  var orderRow = function(msg) {
    var resStr = "";
    var resObj = JSON.parse(msg);
    //$("#productSearch_catagory").reset();
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      resStr += "'<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].OID + "</td><td>" + resObj[i].Customer + "</td><td>" + resObj[i].Total_Price + "</td><td>" + ((resObj[i].Status == 0) ? "未結帳" : "已付款") + "</td><td>" + resObj[i].Order_Time + "</td><td><button class='btn btn-primary' type='button' name='button' onclick='javascript:location.href=\"./order_edit?OID=" + resObj[i].OID + "\"'>編輯</button></td><td><button class='btn btn-danger' type='button' id='orderDeleteButton' data-toggle=\"modal\" data-target=\"#orderDeleteModal \"data-OID=\"" + resObj[i].OID + "\">刪除</button></td></tr>";
    }
    $(".order_list").html(resStr);
  }
  var orderFetch = function() {
    var data = {
      "OID": ($('#orderSearch_OID').val()),
      "CID": ($('#orderSearch_CID').val()),
      "Status": ($('#orderSearch_status').val()),
      "Price_low": ($('#orderSearch_price_low').val()),
      "Price_up": ($('#orderSearch_price_up').val()),
      "Date": ($('#orderSearch_date').val()),
    };
    Post('/admin/api/orderSearch', data, orderRow);
  }
  $("#orderSearch").click(orderFetch);
  $("#filterClear").click(function() {
    $('#orderSearch_OID').val("");
    $('#orderSearch_CID').val("");
    $('#orderSearch_status').val("");
    $('#orderSearch_price_up').val("");
    $('#orderSearch_price_low').val("");
    $('#orderSearch_date').val("");
  });

  // var searchCatagory = function(msg) {
  //   var resObj = JSON.parse(msg);
  //   for (var i = 0; i < Object.keys(resObj).length; i++) {
  //     var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
  //     $("#productSearch_catagory").append(resStr);
  //   }
  // }
  // var searchSupplier = function(msg) {
  //   var resObj = JSON.parse(msg);
  //   for (var i = 0; i < Object.keys(resObj).length; i++) {
  //     var resStr = "<option value=" + resObj[i].Supplier + ">" + resObj[i].Supplier + "</option>";
  //     $("#productSearch_supplier").append(resStr);
  //   }
  // }


  // Get('/admin/api/productCatagory', searchCatagory);
  // Get('/admin/api/productSupplier', searchSupplier);


  var deleteResult = function(msg) {
    var resObj = JSON.parse(msg);
    if ('errno' in resObj) {
      $('.operationResult').html("<div class='alert alert-danger alert-dismissible'><div id='alertContent'>" + '刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage + "</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")
      // $('#alertContent').html('刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage);
    } else {
      $('.operationResult').html("<div class='alert alert-success alert-dismissible'><div id='alertContent'>刪除作業完成!!</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")
    }
    $('.alert').alert();
  }

  $('#orderDeleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var oid = button.data('oid');
    var modal = $(this);
    var content = "是否確認刪除訂單<a href='/admin/order_edit?OID=" + oid + "' target='_blank' >" + oid + "</a>";
    $('#orderDeleteBody').html(content);
    $("#order_delete_oid").val(oid);
  });
  $('#order_delete_submit').click(function() {
    var oid = $('#order_delete_oid').val();
    Get('/admin/api/orderDelete/' + oid, deleteResult);
    orderFetch();
    $('#orderDeleteModal').modal('hide');
  });
  $('#orderDeleteModal').on('hidden.bs.modal', function(event) {
    orderFetch();
  })
});