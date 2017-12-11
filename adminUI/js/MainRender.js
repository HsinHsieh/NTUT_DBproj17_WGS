// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var ProductNum = function(msg) {
    var resObj = JSON.parse(msg);
    $(".stat_product").html(resObj[0].Pnum);
  }
  Get('/admin/api/mainProductNum', ProductNum);
});