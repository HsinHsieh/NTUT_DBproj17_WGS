// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var searchCategory = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
      $("#productAdd_category").append(resStr);
    }
  }
  var addResult = function(msg) {
    var resObj = JSON.parse(msg);

    if ('errno' in resObj) {
      $('#productAddModalTitle').html("操作結果");
      $('#productAddModalBody').html("上架作業失敗!!<br>錯誤代碼：" + resObj.errno + "<br>錯誤訊息：" + resObj.sqlMessage);
      $('#productAddModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">再試一次</button><button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\"  onclick=\"location.href = '/admin';\">確認</button>")

    } else {
      $('#productAddModalTitle').html("操作結果");
      $('#productAddModalBody').html("上架作業完成");
      $('#productAddModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">繼續新增</button><button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" onclick=\"location.href = '/admin';\">確認</button>")
    }
    $("#productAddModal").modal({
      show: true
    });

  }
  var searchID = function(msg) {
    var resObj = JSON.parse(msg);
    var pid = $('#productAdd_category').val();
    var str = '0000000' + resObj[0].NUM
    str = str.substr(-7);
    $('#productAdd_PID').val(pid + str);
  }
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
    var title = $('#productAdd_PID').val();
    $('.uploadImage').ajaxSubmit({
      data: {
        title: title
      },
      contentType: 'application/json',
      success: function(response) {
        console.log('image uploaded and form submitted');
      }
    });
    Post('/admin/api/productAdd', data, addResult);
  });
  $("#productAdd_category").change(function() {
    Get('/admin/api/productMaxID', searchID);
  });
  Get('/admin/api/productCategory', searchCategory);
});