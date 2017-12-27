$(document).ready(function() {
  var eventRow = function(msg) {
    var resStr = "";
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      resStr += "<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].Event_Name + "</td><td>" + resObj[i].Start_DateF + "</td><td>" + resObj[i].End_DateF + "</td><td>" + resObj[i].Target + "</td><td>" + resObj[i].Discount_Rate + "</td><td><button class='btn btn-primary' type='button' name='button' onclick='javascript:location.href=\"./event_edit?EID=" + resObj[i].EID + "\"'>編輯</button></td><td><button class='btn btn-danger' type='button' id='productDeleteButton' data-toggle=\"modal\" data-target=\"#eventDeleteModal \"data-eid=\"" + resObj[i].EID + "\">刪除</button></td></tr>";
    }
    $(".event_list").html(resStr);
  }
  var searchTarget = function(msg) {;
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
      $("#eventSearch_target").append(resStr);
    }
  }
  var searchCategory = function(msg) {
    var resObj = JSON.parse(msg);
    $("#eventSearch_category").html("<option value=''></option>");
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].Event_Category + ">" + resObj[i].Event_Category + "</option>";
      $("#eventSearch_category").append(resStr);
    }
  }
  var eventFetch = function() {
    var data = {
      "EID": ($('#eventSearch_EID').val()),
      "Name": ($('#eventSearch_name').val()),
      "Target": ($('#eventSearch_target').val()),
      "Date_start": ($('#eventSearch_date_start').val()),
      "Date_end": ($('#eventSearch_date_end').val()),
      "Discount": ($('#eventSearch_discount').val()),
      "Category": ($('#eventSearch_category').val()),
    };
    Post('/admin/api/eventSearch', data, eventRow);
  }
  var Result = function(msg) {
    var resObj = JSON.parse(msg);
    if ('errno' in resObj) {
      $('.operationResult').html("<div class='alert alert-danger alert-dismissible'><div id='alertContent'>" + '刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage + "</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")

      $('#alertContent').html('刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage);
    } else {
      $('.operationResult').html("<div class='alert alert-success alert-dismissible'><div id='alertContent'>操作完成!!</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")
    }
    $('.alert').alert();
  }
  $("#eventSearch").click(eventFetch);
  $("#filterClear").click(function() {
    $('#eventSearch_EID').val("");
    $('#eventSearch_name').val("");
    $('#eventSearch_target').val("");
    $('#eventSearch_date_start').val("");
    $('#eventSearch_date_end').val("");
    $('#eventSearch_discount').val("");
    $('#eventSearch_category').val("");
    eventFetch();
  });
  $('#eventDeleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var eid = button.data('eid');
    var modal = $(this);
    $('#eventDeleteModalBody').html("確認刪除活動" + eid + "?");
    $('#category_delete_eid').val(eid);
  });
  $('#event_delete_submit').click(function() {
    var eid = $('#category_delete_eid').val();
    Get('/admin/api/eventDelete/' + eid, Result);
    $('#eventDeleteModal').modal('hide');
    eventFetch();
    Get('/admin/api/eventCategory', searchCategory);
  });
  Get('/admin/api/productCategory', searchTarget);
  Get('/admin/api/eventCategory', searchCategory);
});