$(document).ready(function() {
  var CIDAutoComplete = {
    url: "api/memberSearch",
    getValue: "CID",
    list: {
      match: {
        enabled: true
      }
    },

    template: {
      type: "custom",
      method: function(value, item) {
        return value + " | " + item.First_Name + item.Last_Name;
      }
    }

  };
  var emailAutoComplete = {
    url: "api/memberSearch",
    getValue: "Email",
    list: {
      match: {
        enabled: true
      }
    },

    template: {
      type: "custom",
      method: function(value, item) {
        return value + " | " + item.First_Name + item.Last_Name;
      }
    }

  };
  $("#memberSearch_CID").easyAutocomplete(CIDAutoComplete);
  $("#memberSearch_email").easyAutocomplete(emailAutoComplete);
  var memberRow = function(msg) {
    var resStr = "";
    var resObj = JSON.parse(msg);
    //$("#memberSearch_catagory").reset();
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      resStr += "'<tr><th scope='row'>" + (i + 1) + "</td><td>" + resObj[i].CID + "</td><td>" + resObj[i].First_Name + resObj[i].Last_Name + "</td><td>" + resObj[i].Email + "</td><td>" + (resObj[i].Gender == 0 ? "女" : (resObj[i].Gender == 1) ? "男" : "都不是") + "</td><td>" + (resObj[i].Type == 0 ? "顧客" : (resObj[i].Type == 1 ? "職員" : "管理員")) + "</td><td><button class='btn btn-default' type='button' id='memberAuthorizeButton' data-toggle=\"modal\" data-target=\"#memberAuthorizeModal \" data-cid=\"" + resObj[i].CID + "\" data-type='" + resObj[i].Type + "'>設定</button></td>" + "</td><td><button class='btn btn-primary' type='button' name='button' onclick='javascript:location.href=\"./member_edit?CID=" + resObj[i].CID + "\"'>編輯</button></td><td><button class='btn btn-danger' type='button' id='memberDeleteButton' data-toggle=\"modal\" data-target=\"#memberDeleteModal \"data-cid=\"" + resObj[i].CID + "\">刪除</button></td></tr>";
    }
    $(".member_list").html(resStr);
  }

  var operationResult = function(msg) {
    var resObj = JSON.parse(msg);
    if ('errno' in resObj) {
      $('.operationResult').html("<div class='alert alert-danger alert-dismissible'><div id='alertContent'>" + '刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage + "</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")

      $('#alertContent').html('刪除作業失敗!!<br>錯誤代碼：' + resObj.errno + '<br>錯誤訊息：' + resObj.sqlMessage);
    } else {
      $('.operationResult').html("<div class='alert alert-success alert-dismissible'><div id='alertContent'>操作完成!!</div><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>")
    }
    $('.alert').alert();
  }
  var memberFetch = function() {
    var data = {
      "CID": ($('#memberSearch_CID').val()),
      "Email": ($('#memberSearch_email').val()),
      "Name": ($('#memberSearch_name').val()),
      "Gender": ($('#memberSearch_gender').val()),
      "Type": ($('#memberSearch_type').val()),
    };
    Post('/admin/api/memberSearch', data, memberRow);
  }

  $("#memberSearch").click(memberFetch);
  $("#filterClear").click(function() {
    $('#memberSearch_CID').val("");
    $('#memberSearch_email').val("");
    $('#memberSearch_name').val("");
    $('#memberSearch_gender').val("");
    $('#memberSearch_type').val("");
    memberFetch();
  });
  $('.memberDeleteConfirm').click(function() {
    var cid = $('#memberDeleteCID').val()
    Get('/admin/api/memberDelete/' + cid, operationResult);
    $('#memberDeleteModal').modal('hide');
  })
  $('#memberDeleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var cid = button.data('cid')
    var modal = $(this)
    $('#memberDeleteCID').val(cid)
    $('#memberDeleteModalTitle').html("帳戶刪除");
    $('#memberDeleteModalBody').html("確認刪除帳戶<a href='/admin/memberEdit?CID=" + cid + "' target='_blank'>" + cid + "</a>?<br>此動作無法復原");
  });
  $('#memberDeleteModal').on('hidden.bs.modal', function(event) {
    memberFetch();
  })
  $('.memberAuthorizeConfirm').click(function() {
    data = {
      "CID": $('#memberAuthorize_CID').val(),
      "Type": $('#memberAuthorize_type').val(),
    }
    Post('/admin/api/memberAuthorize/', data, operationResult);
    $('#memberAuthorizeModal').modal('hide');
  })
  $('#memberAuthorizeModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget)
    var cid = button.data('cid')
    var modal = $(this)
    $('#memberAuthorize_type').val(button.data('type'))
    $('#memberAuthorize_CID').val(cid)
  });
  $('#memberAuthorizeModal').on('hidden.bs.modal', function(event) {
    memberFetch();
  })
});