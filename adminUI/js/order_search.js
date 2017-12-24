$(document).ready(function() {
  var orderRow = function(msg) {
    var resStr = "";
    var resObj = JSON.parse(msg);
    //$("#productSearch_catagory").reset();
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      resStr += "'<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].OID + "</td><td>" + resObj[i].Customer + "</td><td>" + resObj[i].Total_Price + "</td><td>" + resObj[i].Status + "</td><td>" + resObj[i].Order_Time + "</td><td><button class='btn btn-primary' type='button' name='button' onclick='javascript:location.href=\"./order_edit?OID=" + resObj[i].OID + "\"'>編輯</button></td><td><button class='btn btn-danger' type='button' id='productDeleteButton' data-toggle=\"modal\" data-target=\"#productDeleteModal \"data-OID=\"" + resObj[i].PID + "\">刪除</button></td></tr>";
    }
    $(".order_list").html(resStr);
  }
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
  // var productDelete = function(msg) {
  //   var resObj = JSON.parse(msg);
  //   var Str = "商品編號：" + resObj[0].PID + "<br>商品名稱：" + resObj[0].Product_Name + "<br>供應商：" + resObj[0].Supplier + "<br>上市日期：" + resObj[0].Launch_Date;
  //   $('.productDeleteContent').html(Str);
  //   var PicStr = "<img src=\"/product_pic/" + resObj[0].PID + ".jpg\" alt=\"NO PICTURE\" class=\"img-thumbnail\">"
  //   $('.productDeletePic').html(PicStr);
  // }
  // var productDeleteResult = function(msg) {
  //   resObj = JSON.parse(msg);
  //   if ('errno' in resObj) {
  //     $('#productDeleteModalTitle').html("操作結果");
  //     $('#productDeleteModalBody').html("刪除作業失敗!!錯誤代碼：" + resObj.errno);
  //     $('#productDeleteModalFooter').html("<button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">確認</button>")
  //
  //   } else {
  //     $('#productDeleteModalTitle').html("操作結果");
  //     $('#productDeleteModalBody').html("刪除作業完成");
  //     $('#productDeleteModalFooter').html("<button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">確認</button>")
  //
  //   }
  // }
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
  // var productDeleteModalSet = function() {
  //   $('#productDeleteModalTitle').html("是否確認刪除以下產品?");
  //   $('#productDeleteModalBody').html("	<div class=\"row\"><div class=\"col-md-6\"><div class=\"productDeleteContent\"></div></div><div class=\"col-md-6\"><div class=\"productDeletePic\"> </div></div></div>");
  //   $('#productDeleteModalFooter').html("");
  //   $('#productDeleteModalFooter').append("<input type=\"hidden\" id=\"productDeletePID\" value=\"\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button><button type=\"button\" class=\"btn btn-danger productDeleteConfirm\">確認</button>")
  // }
  // Get('/admin/api/productCatagory', searchCatagory);
  // Get('/admin/api/productSupplier', searchSupplier);
  // $('.productDeleteConfirm').click(function() {
  //   Get('/admin/api/prouctDelete/' + $('#productDeletePID').val(), productDeleteResult);
  // })
  $("#orderSearch").click(orderFetch);
  $("#filterClear").click(function() {
    $('#orderSearch_OID').val("");
    $('#orderSearch_CID').val("");
    $('#orderSearch_status').val("");
    $('#orderSearch_price_up').val("");
    $('#orderSearch_price_low').val("");
    $('#orderSearch_date').val("");
  });

  // $('#productDeleteModal').on('show.bs.modal', function(event) {
  //   var button = $(event.relatedTarget)
  //   var pid = button.data('pid')
  //   var modal = $(this)
  //   $('#productDeletePID').val(pid);
  //   Get('/admin/api/productEdit/' + pid, productDelete);
  //   //modal.find('.modal-title').text('刪除商品' + pid)
  //   //modal.find('.modal-body input').val(pid)
  // });
  // $('#productDeleteModal').on('hidden.bs.modal', function(event) {
  //   productFetch();
  //   productDeleteModalSet();
  //   $('.productDeleteConfirm').click(function() {
  //     Get('/admin/api/prouctDelete/' + $('#productDeletePID').val(), productDeleteResult);
  //   })
  // })


});