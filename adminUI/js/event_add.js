// const event_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
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
  var searchCategory = function(msg) {
    var resObj = JSON.parse(msg);
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      var resStr = "<option value=" + resObj[i].CAID + ">" + resObj[i].CAID + resObj[i].Category_Name + "</option>";
      $("#eventAdd_target").append(resStr);
    }
  }
  var addResult = function(msg) {
    var resObj = JSON.parse(msg);
    if ('errno' in resObj) {
      $('#eventAddModalTitle').html("操作結果");
      $('#eventAddModalBody').html("新增作業失敗!!<br>錯誤代碼：" + resObj.errno + "<br>錯誤訊息：" + resObj.sqlMessage);
      $('#eventAddModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">再試一次</button><button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\"  onclick=\"location.href = '/admin';\">確認</button>")

    } else {
      $('#eventAddModalTitle').html("操作結果");
      $('#eventAddModalBody').html("新增作業完成");
      $('#eventAddModalFooter').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" onClick=\"window.location.reload()\">繼續新增</button><button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" onclick=\"location.href = '/admin';\">確認</button>")
    }
    $("#eventAddModal").modal({
      show: true
    });

  }
  var searchID = function(msg) {
    var resObj = JSON.parse(msg);
    var pid = $('#eventAdd_category').val();
    var str = '0000000' + resObj[0].NUM
    str = str.substr(-7);
    $('#eventAdd_PID').val(pid + str);
  }
  Get('/admin/api/productCategory', searchCategory);
  $("#event_add_submit").click(function() {
    var data = {
      "Name": ($('#eventAdd_name').val()),
      "Category": ($('#eventAdd_category').val()),
      "Discount": ($('#eventAdd_discount').val()),
      "Target": ($('#eventAdd_target').val()),
      "Date_start": ($('#eventAdd_date_start').val()),
      "Date_end": ($('#eventAdd_date_end').val()),
      "Description": ($('#eventAdd_description').val()),
    };
    Post('/admin/api/eventAdd', data, addResult);
  });
  $("#eventAdd_category").easyAutocomplete(categoryAutoComplete);
});