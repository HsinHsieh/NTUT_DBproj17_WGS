// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var url = new URL(window.location.href);
  var OriginalEID = url.searchParams.get("EID");
  var categoryAutoComplete = {
    url: "api/eventCategory",
    getValue: "Event_Category",
    list: {
      match: {
        enabled: true
      }
    },

    template: {
      type: "custom",
      method: function(value, item) {
        return value;
      }
    }

  };
  var searchTarget = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
      $("#eventEdit_target").append(resStr);
    }
  }
  var addResult = function(msg) {
    //console.log(msg);
    var resObj = JSON.parse(msg);
    console.log(resObj);
    if ('errno' in resObj) {
      $('#eventEditModalTitle').html("操作結果");
      $('#eventEditModalBody').html("刪除作業失敗!!<br>錯誤代碼：" + resObj.errno + "<br>錯誤訊息：" + resObj.sqlMessage);
      $('#eventEditModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">再試一次</button><button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\"  onclick=\"location.href = '/admin/event_search';\">確認</button>")

    } else {
      $('#eventEditModalTitle').html("操作結果");
      $('#eventEditModalBody').html("修改作業完成");
      $('#eventEditModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"location.href = '/admin/event_edit?EID=" + $('#eventEdit_EID').val() + "';\">再次修改</button><button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" onclick=\"location.href = '/admin/event_search';\">確認</button>")
    }
    $("#eventEditModal").modal({
      show: true
    });

  }
  var searchDetail = function(msg) {
    var resObj = JSON.parse(msg);
    $('#eventEdit_EID').val(resObj[0].EID);
    $('#eventEdit_name').val(resObj[0].Event_Name);
    $('#eventEdit_discount').val(resObj[0].Discount_Rate);
    $('#eventEdit_target').val(resObj[0].Target);
    $('#eventEdit_category').val(resObj[0].Event_Category);
    $('#eventEdit_date_start').val(resObj[0].Start_DateF);
    $('#eventEdit_date_end').val(resObj[0].End_DateF);
    $('#eventEdit_description').val(resObj[0].Event_Description);
  }
  Get('/admin/api/productCategory', searchTarget);
  Get('/admin/api/eventEdit/' + OriginalEID, searchDetail);
  $("#event_edit_submit").click(function() {
    var data = {
      "EID": ($('#eventEdit_EID').val()),
      "Name": ($('#eventEdit_name').val()),
      "Discount": ($('#eventEdit_discount').val()),
      "Target": ($('#eventEdit_target').val()),
      "Category": ($('#eventEdit_category').val()),
      "Date_start": ($('#eventEdit_date_start').val()),
      "Date_end": ($('#eventEdit_date_end').val()),
      "Description": ($('#eventEdit_description').val()),
    };

    Post('/admin/api/eventEdit', data, addResult);
  });
  $("#eventEdit_category").easyAutocomplete(categoryAutoComplete);

});