// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var productRow = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "'<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].PID + "</td><td>" + resObj[i].Product_Name + "</td><td>" + resObj[i].Supplier + "</td><td>" + resObj[i].Price + "</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
      $(".product_list").append(resStr);
    }
  }
  var searchCatagory = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
      $("#productSearch_catagory").append(resStr);
    }
  }
  //Get('/admin/api/productIndex', productRow);
  Get('/admin/api/productCatagory', searchCatagory);

  $("#productSearch").click(function() {
    var data = {
      "CID": ($('#productSearch_CID').val()),
      "Name": ($('#productSearch_name').val()),
      "Price": ($('#productSearch_price_up').val()),
    };
    Post('/admin/api/productSearch', data, productRow);
    // console.log($('#productSearch_CID').val());
    // console.log($('#productSearch_name').val());
    // console.log($('#productSearch_supplier').val());
    // console.log($('#productSearch_price_up').val());
    // console.log($('#productSearch_price_low').val());
    // console.log($('#productSearch_catagory').val());
  });
});