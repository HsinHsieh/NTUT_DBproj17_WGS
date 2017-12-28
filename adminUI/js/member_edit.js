// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var url = new URL(window.location.href);
  var OriginalCID = url.searchParams.get("CID");
  var editResult = function(msg) {
    var resObj = JSON.parse(msg);
    console.log(resObj);
    if ('errno' in resObj) {
      $('#memberEditModalTitle').html("操作結果");
      $('#memberEditModalBody').html("刪除作業失敗!!<br>錯誤代碼：" + resObj.errno + "<br>錯誤訊息：" + resObj.sqlMessage);
      $('#memberEditModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">再試一次</button><button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\"  onclick=\"location.href = '/admin/member_search';\">確認</button>")

    } else {
      $('#memberEditModalTitle').html("操作結果");
      $('#memberEditModalBody').html("修改作業完成");
      $('#memberEditModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"location.href = '/admin/member_edit?CID=" + $('#memberEdit_CID').val() + "';\">再次修改</button><button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" onclick=\"location.href = '/admin/member_search';\">確認</button>")
    }
    $("#memberEditModal").modal({
      show: true
    });
  }
  var searchDetail = function(msg) {
    var resObj = JSON.parse(msg);
    $('#memberEdit_CID').val(resObj[0].CID);
    $('#memberEdit_gender').val(resObj[0].Gender);
    $('#memberEdit_last_name').val(resObj[0].Last_Name);
    $('#memberEdit_first_name').val(resObj[0].First_Name);
    $('#memberEdit_email').val(resObj[0].Email);
    $('#memberEdit_phone').val(resObj[0].Phone);
    $('#memberEdit_address').val(resObj[0].Address);
    $('#memberEdit_birthday').val(resObj[0].BirthdayF);
    $('#memberEdit_reward_point').val(resObj[0].Reward_Point);
  }
  $("#member_edit_submit").click(function() {
    var data = {
      "CID": ($('#memberEdit_CID').val()),
      "Gender": ($('#memberEdit_gender').val()),
      "Last_name": ($('#memberEdit_last_name').val()),
      "First_name": ($('#memberEdit_first_name').val()),
      "Email": ($('#memberEdit_email').val()),
      "Phone": ($('#memberEdit_phone').val()),
      "Address": ($('#memberEdit_address').val()),
      "Birthday": ($('#memberEdit_birthday').val()),
      "Reward_point": ($('#memberEdit_reward_point').val()),
    };
    Post('/admin/api/memberEdit', data, editResult);
  });
  Get('/admin/api/memberEdit/' + OriginalCID, searchDetail);
});