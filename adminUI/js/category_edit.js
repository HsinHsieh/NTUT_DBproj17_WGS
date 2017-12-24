// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var searchCategory = function(msg) {
    var resObj = JSON.parse(msg);
    $(".product_list").html(" ");
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].CAID + "</td><td>" + resObj[i].Category_Name + "</td><td><button class='btn btn-primary' type='button' name='button'  id='productDeleteButton' data-toggle=\"modal\" data-target=\"#categoryEditModal \"data-caid=\"" + resObj[i].CAID + "\" data-name=\"" + resObj[i].Category_Name + "\">編輯</button></td><td><button class='btn btn-danger' type='button' id='productDeleteButton' data-toggle=\"modal\" data-target=\"#categoryDeleteModal \"data-caid=\"" + resObj[i].CAID + "\"data-name=\"" + resObj[i].Category_Name + "\">刪除</button></td></tr>";
      $(".product_list").append(resStr);
    }
  }
  var addResult = function(msg) {
    var resObj = JSON.parse(msg);
    if ('errno' in resObj) {
      $('.operationResult').html("<div class='alert alert-danger alert-dismissible'><div id='alertContent'>" + '刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage + "</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")

      $('#alertContent').html('刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage);
    } else {
      $('.operationResult').html("<div class='alert alert-success alert-dismissible'><div id='alertContent'>操作完成!!</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")
    }
    $('.alert').alert();
  }
  Get('/admin/api/productCategory', searchCategory);
  $('#categoryEditModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var caid = button.data('caid');
    var name = button.data('name');
    var modal = $(this)
    $('#category_edit_CAID').val(caid);
    $('#category_edit_name').val(name);
    $('#category_edit_originalcaid').val(caid);
  });
  $('#categoryDeleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var caid = button.data('caid');
    var name = button.data('name');
    var modal = $(this);
    $('#categoryDeleteBody').html("是否確認刪除以下分類??<br>分類編號 : " + caid + "<br>分類名稱 : " + name);
    $("#category_delete_caid").val(caid);
  });
  $('#categoryAddModal').on('show.bs.modal', function(event) {
    $('#category_add_CAID').val("");
    $('#category_add_name').val("");
  });
  $('#category_add_submit').click(function() {
    var data = {
      "CAID": ($('#category_add_CAID').val()),
      "Name": ($('#category_add_name').val()),
    };
    Post('/admin/api/categoryAdd', data, addResult);
    Get('/admin/api/productCategory', searchCategory);
    $('#categoryAddModal').modal('hide');
  });
  $('#category_edit_submit').click(function() {
    var data = {
      "CAID": ($('#category_edit_CAID').val()),
      "Name": ($('#category_edit_name').val()),
      "OriginalCAID": ($('#category_edit_originalcaid').val()),
    };
    Post('/admin/api/categoryEdit', data, addResult);
    Get('/admin/api/productCategory', searchCategory);
    $('#categoryEditModal').modal('hide');
  });
  $('#category_delete_submit').click(function() {
    var caid = $('#category_delete_caid').val()
    Get('/admin/api/categoryDelete/' + caid, addResult);
    Get('/admin/api/productCategory', searchCategory);
    $('#categoryDeleteModal').modal('hide');
  });
});