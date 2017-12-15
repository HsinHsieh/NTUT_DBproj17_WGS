// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var productRow = function(msg) {
    var resStr = "";
    var resObj = JSON.parse(msg);
    //$("#productSearch_catagory").reset();
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      resStr += "'<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].PID + "</td><td>" + resObj[i].Product_Name + "</td><td>" + resObj[i].Supplier + "</td><td>" + resObj[i].Price + "</td><td><button class='btn btn-primary' type='button' name='button' onclick='javascript:location.href=\"./product_edit?PID=" + resObj[i].PID + "\"'>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
    }
    $(".product_list").html(resStr);
  }
  var searchCatagory = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
      $("#productSearch_catagory").append(resStr);
    }
  }
  var searchSupplier = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].Supplier + ">" + resObj[i].Supplier + "</option>";
      $("#productSearch_supplier").append(resStr);
    }
  }
  //  Get('/admin/api/productIndex', productRow);
  Get('/admin/api/productCatagory', searchCatagory);
  Get('/admin/api/productSupplier', searchSupplier);
  $("#productSearch").click(function() {
    var data = {
      "PID": ($('#productSearch_PID').val()),
      "Name": ($('#productSearch_name').val()),
      "Supplier": ($('#productSearch_supplier').val()),
      "Price_low": ($('#productSearch_price_low').val()),
      "Price_up": ($('#productSearch_price_up').val()),
      "Category": ($('#productSearch_catagory').val()),
    };
    Post('/admin/api/productSearch', data, productRow);
  });
  $("#filterClear").click(function() {
    $('#productSearch_PID').val("");
    $('#productSearch_name').val("");
    $('#productSearch_supplier').val("");
    $('#productSearch_price_low').val("");
    $('#productSearch_price_up').val("");
    $('#productSearch_catagory').val("");
  });
});