// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var searchCatagory = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].CAID + "</td><td>" + resObj[i].Category_Name + "</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
      $(".product_list").append(resStr);
    }
  }

  //  Get('/admin/api/productIndex', productRow);
  Get('/admin/api/productCatagory', searchCatagory);
});