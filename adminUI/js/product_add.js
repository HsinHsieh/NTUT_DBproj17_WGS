// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var searchCatagory = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
      $("#productAdd_category").append(resStr);
    }
  }
  var addResult = function(msg) {
    console.log(msg);
  }
  var searchID = function(msg) {
    var resObj = JSON.parse(msg);
    var pid = $('#productAdd_category').val();
    var str = '0000000' + resObj[0].NUM
    str = str.substr(-7);
    $('#productAdd_PID').val(pid + str);
  }
  Get('/admin/api/productCatagory', searchCatagory);
  $("#product_add_submit").click(function() {
    var data = {
      "PID": ($('#productAdd_PID').val()),
      "Name": ($('#productAdd_name').val()),
      "Price": ($('#productAdd_price').val()),
      "Supplier": ($('#productAdd_supplier').val()),
      "Category": ($('#productAdd_category').val()),
      "Description": ($('#productAdd_description').val()),
      "Requirement": ($('#productAdd_Requirement').val()),
      "Date": ($('#productAdd_date').val()),
    };
    Post('/admin/api/productAdd', data, addResult);
  });
  $("#productAdd_category").change(function() {
    Get('/admin/api/productMaxID', searchID);
  });
});