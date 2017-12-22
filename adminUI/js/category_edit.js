// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var searchCatagory = function(msg) {
    var resObj = JSON.parse(msg);
    $(".product_list").html(" ");
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].CAID + "</td><td>" + resObj[i].Category_Name + "</td><td><button class='btn btn-primary' type='button' name='button'  id='productDeleteButton' data-toggle=\"modal\" data-target=\"#categoryEditModal \"data-caid=\"" + resObj[i].CAID + "\" data-name=\"" + resObj[i].Category_Name + "\">編輯</button></td><td><button class='btn btn-danger' type='button' id='productDeleteButton' data-toggle=\"modal\" data-target=\"#categoryEditModal \"data-PID=\"" + resObj[i].CAID + "\">刪除</button></td></tr>";
      $(".product_list").append(resStr);
    }
  }
  var setEditModal = function() {
    var title = "分類修改";
    var body = "<label for='Name'>分類編號</label><input type='text' class='form-control' id='catagory_edit_CAID' placeholder='CAID' value=''><label for='Name'>分類名稱</label><input type='text' class='form-control' id='catagory_edit_name' placeholder='分類名稱' value=''>"
    var footer = "<input type='hidden' name='originalcaid' id='category_edit_originalcaid' value=''><button class='btn btn-primary btn-lg pull-right' id='category_edit_submit'>修改</button><button type='button' class='btn btn-default btn-lg' data-dismiss='modal'>取消</button>"
    $('#categoryEditTitle').html(title);
    $("#categoryEditBody").html(body);
    $('#categoryEditFooter').html(footer);
  }
  var setAddModal = function() {

  }
  var setCompeleteModal = function() {
    var title = "操作結果";
    var body = "分類修改成功"
    var footer = "<button type='button' class='btn btn-success btn-lg' data-dismiss='modal'>確定</button>"
    $('#categoryEditTitle').html(title);
    $("#categoryEditBody").html(body);
    $('#categoryEditFooter').html(footer);
  }
  var addResult = function(msg) {
    console.log(msg);
  }
  Get('/admin/api/productCatagory', searchCatagory);
  setAddModal();
  //setEditModal();
  $('#categoryEditModal').on('show.bs.modal', function(event) {
    setEditModal();
    console.log("====");
    var button = $(event.relatedTarget)
    var caid = button.data('caid');
    var name = button.data('name');
    var modal = $(this)
    console.log(caid);
    $('#category_edit_CAID').val(caid);
    $('#category_edit_name').val(name);
    $('#category_edit_originalcaid').val(caid);
    //modal.find('.modal-title').text('刪除商品' + pid)
    //modal.find('.modal-body input').val(pid)
  });

  $('#category_add_submit').click(function() {
    var data = {
      "CAID": ($('#catagory_add_CAID').val()),
      "Name": ($('#catagory_add_name').val()),
    };
    Post('/admin/api/categoryAdd', data, addResult);
    $("#")
    Get('/admin/api/productCatagory', searchCatagory);
  });
  $('#category_edit_submit').click(function() {
    var data = {
      "CAID": ($('#catagory_edit_CAID').val()),
      "Name": ($('#catagory_edit_name').val()),
      "OriginalCAID": ($('#catagory_edit_originalCAID').val()),
    };
    Post('/admin/api/categoryEdit', data, addResult);
    Get('/admin/api/productCatagory', searchCatagory);
  });
});