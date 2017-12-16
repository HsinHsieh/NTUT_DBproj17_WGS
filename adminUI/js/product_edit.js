// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var url = new URL(window.location.href);
  var OriginalPID = url.searchParams.get("PID");
  var searchCatagory = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
      console.log(resStr);
      $("#productEdit_category").append(resStr);
    }
  }
  var searchID = function(msg) {
    var resObj = JSON.parse(msg);
    var pid = $('productEdit_PID').val();
    var str = ($('#productEdit_category').val()) + pid.substr(-7);
    $('#productAdd_PID').val(pid + str);
  }
  var addResult = function(msg) {
    //console.log(msg);
  }
  var searchDetail = function(msg) {
    var resObj = JSON.parse(msg);
    console.log(resObj);
    $('#productEdit_PID').val(resObj[0].PID);
    $('#productEdit_name').val(resObj[0].Product_Name);
    $('#productEdit_price').val(resObj[0].Price);
    $('#productEdit_supplier').val(resObj[0].Supplier);
    $('#productEdit_category').val(resObj[0].Category);
    $('#productEdit_description').val(resObj[0].Product_Description);
    $('#productEdit_requirement').val(resObj[0].System_Requirement);
    $('#productEdit_date').val(resObj[0].Launch_Date);
  }
  Get('/admin/api/productCatagory', searchCatagory);
  Get('/admin/api/productEdit/' + OriginalPID, searchDetail);
  $("#product_add_submit").click(function() {
    var data = {
      "OriginalPID": (OriginalPID),
      "PID": ($('#productEdit_PID').val()),
      "Name": ($('#productEdit_name').val()),
      "Price": ($('#productEdit_price').val()),
      "Supplier": ($('#productEdit_supplier').val()),
      "Category": ($('#productEdit_category').val()),
      "Description": ($('#productEdit_description').val()),
      "Requirement": ($('#productEdit_requirement').val()),
      "Date": ($('#productEdit_date').val()),
    };
    // var title = $('#productEdit_PID').val();
    // $('.uploadImage').ajaxSubmit({
    //   data: {
    //     title: title
    //   },
    //   contentType: 'application/json',
    //   success: function(response) {
    //     console.log('image uploaded and form submitted');
    //   }
    // });
    Post('/admin/api/productEdit', data, addResult);
  });
  $("#productEdit_category").change(function() {
    var pid = $('#productEdit_PID').val();
    var str = ($('#productEdit_category').val()) + pid.substr(-7);
    $('#productEdit_PID').val(str);
    // $('#productEdit_PID').attr('disabled', true);
    // $('#productEdit_name').attr('disabled', true);
    // $('#productEdit_price').attr('disabled', true);
    // $('#productEdit_supplier').attr('disabled', true);
    // $('#productEdit_description').attr('disabled', true);
    // $('#productEdit_Requirement').attr('disabled', true);
    // $('#productEdit_date').attr('disabled', true);

  });

});