// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var url = new URL(window.location.href);
  var OriginalOID = url.searchParams.get("OID");
  var tempPrice;
  // var searchID = function(msg) {
  //   var resObj = JSON.parse(msg);
  //   var pid = $('productEdit_PID').val();
  //   var str = ($('#productEdit_category').val()) + pid.substr(-7);
  //   $('#productAdd_PID').val(pid + str);
  // }
  // var addResult = function(msg) {
  //   //console.log(msg);
  //   var resObj = JSON.parse(msg);
  //   console.log(resObj);
  //   if ('errno' in resObj) {
  //     $('#productEditModalTitle').html("操作結果");
  //     $('#productEditModalBody').html("刪除作業失敗!!<br>錯誤代碼：" + resObj.errno + "<br>錯誤訊息：" + resObj.sqlMessage);
  //     $('#productEditModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">再試一次</button><button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\"  onclick=\"location.href = '/admin/product_search';\">確認</button>")
  //
  //   } else {
  //     $('#productEditModalTitle').html("操作結果");
  //     $('#productEditModalBody').html("修改作業完成");
  //     $('#productEditModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"location.href = '/admin/product_edit?PID=" + $('#productEdit_PID').val() + "';\">再次修改</button><button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" onclick=\"location.href = '/admin/product_search';\">確認</button>")
  //   }
  //   $("#productEditModal").modal({
  //     show: true
  //   });
  //
  // }
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
      resStr += "'<tr><th scope='row'>" + (i + 1) + "</th><td><a href='/admin/product_edit?PID=" + resObj[i].Item + "' target='_blank' >" + resObj[i].Item + "</a></th><td>" + resObj[i].Price + "</td><td><button class='btn btn-warning' type='button' name='button' onclick='javascript:location.href=\"./order_edit?OID=" + resObj[i].OCID + "\"'>金鑰查詢</button></td><td><button class='btn btn-danger' type='button' id='orderCDeleteButton' data-toggle=\"modal\" data-target=\"#orderCDeleteModal \"data-OCID=\"" + resObj[i].OCID + "\">刪除</button></td></tr>";
      tempPrice += resObj[i].Price;
    }
    $(".orderContent_list").html(resStr);
    calculatePrice();
  }
  var calculatePrice = function() {
    $("#orderEdit_price").val(tempPrice - $("#orderEdit_discount").val());
  }
  $("#orderEdit_discount").change(calculatePrice);
  // Get('/admin/api/productCatagory', searchCatagory);
  Get('/admin/api/orderEditMain/' + OriginalOID, searchOrderMain);
  Get('/admin/api/orderEditContent/' + OriginalOID, contentRow);
  // $("#product_edit_submit").click(function() {
  //   var data = {
  //     "OriginalPID": (OriginalPID),
  //     "PID": ($('#productEdit_PID').val()),
  //     "Name": ($('#productEdit_name').val()),
  //     "Price": ($('#productEdit_price').val()),
  //     "Supplier": ($('#productEdit_supplier').val()),
  //     "Category": ($('#productEdit_category').val()),
  //     "Description": ($('#productEdit_description').val()),
  //     "Requirement": ($('#productEdit_requirement').val()),
  //     "Date": ($('#productEdit_date').val()),
  //   };
  //   $('.uploadImage').ajaxSubmit({
  //     data: {
  //       originalname: data.OriginalPID,
  //       newname: data.PID,
  //       picture: ($('#imagename').val())
  //     },
  //     contentType: 'application/json',
  //     success: function(response) {
  //       console.log('image uploaded and form submitted');
  //     }
  //   });
  //   Post('/admin/api/productEdit', data, addResult);
  // });
  // $("#productEdit_category").change(function() {
  //   var pid = $('#productEdit_PID').val();
  //   var str = ($('#productEdit_category').val()) + pid.substr(-7);
  //   $('#productEdit_PID').val(str);
  //   // $('#productEdit_PID').attr('disabled', true);
  //   // $('#productEdit_name').attr('disabled', true);
  //   // $('#productEdit_price').attr('disabled', true);
  //   // $('#productEdit_supplier').attr('disabled', true);
  //   // $('#productEdit_description').attr('disabled', true);
  //   // $('#productEdit_Requirement').attr('disabled', true);
  //   // $('#productEdit_date').attr('disabled', true);
  //
  // });

});