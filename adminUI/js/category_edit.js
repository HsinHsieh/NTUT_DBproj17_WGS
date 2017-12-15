// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var searchCatagory = function(msg) {
    var resObj = JSON.parse(msg);
    $(".product_list").html(" ");
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].CAID + "</td><td>" + resObj[i].Category_Name + "</td><td><button class='btn btn-primary btn-sm' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger btn-sm' type='button' name='button'>刪除</button></td></tr>"
      $(".product_list").append(resStr);
    }
  }
  var addResult = function(msg) {
    console.log(msg);
  }
  Get('/admin/api/productCatagory', searchCatagory);
  $("#category_edit_add").click(function() {
    $('#catagory_add_CAID').val("");
    $('#catagory_add_name').val("");
  });
  $('#category_add_submit').click(function() {
    var data = {
      "CAID": ($('#catagory_add_CAID').val()),
      "Name": ($('#catagory_add_name').val()),
    };
    console.log("====");
    console.log(data);
    Post('/admin/api/categoryAdd', data, addResult);
    console.log("======");
    console.log(addResult);
    Get('/admin/api/productCatagory', searchCatagory);
  });
});