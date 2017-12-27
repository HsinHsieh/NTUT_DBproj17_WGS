// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick='location.href='product_edit.html''>編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
  var memberAutoComplete = {
    url: "api/memberInOrderSearch",
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
  var productAutoComplete = {
    url: "api/productInOrderSearch",
    getValue: "PID",
    list: {
      match: {
        enabled: true
      }
    },

    template: {
      type: "custom",
      method: function(value, item) {
        return value + " | " + item.Product_Name;
      }
    }

  };
  var keyRow = function(msg) {
    var resObj = JSON.parse(msg);
    var resStr = "";
    $(".key_list").html(" ");
    for (var i = 0; i < Object.keys(resObj).length; i++) {
      resStr += "<tr><th scope='row'>" + (i + 1) + "</th><td><a href='/admin/order_edit?OID=" + resObj[i].Order_Number + "' target='_blank'>" + resObj[i].Order_Number + "</a></td><td>" + resObj[i].Customer + "</td><td><a href='/admin/product_edit?PID=" + resObj[i].Item + "' target='_blank'>" + resObj[i].Item + "</a></td><td>" + resObj[i].License_Key;
      if (resObj[i].Key_Used == 1) {
        resStr += "</td><td><button class='btn btn-default keyUsed' type='button' name='button'   data-ocid='" + resObj[i].OCID + "'>已使用</button></td>";
      } else {
        resStr += "</td><td><button class='btn btn-primary keyUnused' type='button' name='button' data-ocid='" + resObj[i].OCID + "'>未使用</button></td>";
      }
      //((resObj[i].Key_Used == 0) ? "'primary'" : "default") + "' type='button' name='button'  id='productDeleteButton'data-caid='" + resObj[i].CAID + "'>" + ((resObj[i].Key_Used == 0) ? "未使用" : "已使用") + "</button></td>";
      $(".key_list").html(resStr);
    }

  }
  var keyFetch = function() {
    var data = {
      "OID": ($('#keySearch_OID').val()),
      "CID": ($('#keySearch_CID').val()),
      "PID": ($('#keySearch_PID').val()),
      "Status": ($('#keySearch_status').val()),
    };
    Post('/admin/api/keySearch', data, keyRow);
  }
  var result = function(msg) {
    keyFetch();
  }
  $("#keySearch").click(keyFetch);
  $("#filterClear").click(function() {
    $('#keySearch_OID').val("");
    $('#keySearch_CID').val("");
    $('#keySearch_PID').val("");
    $('#keySearch_status').val("");
    keyFetch();
  })
  $(document).on("click", ".keyUsed", function(e) {
    var ocid = e.target.dataset.ocid;
    Get('/admin/api/keyDeactivate/' + ocid, result)
  });
  $(document).on("click", ".keyUnused", function(e) {
    var ocid = e.target.dataset.ocid;
    Get('/admin/api/keyActivate/' + ocid, result)
  });
  $("#keySearch_CID").easyAutocomplete(memberAutoComplete);
  $("#keySearch_PID").easyAutocomplete(productAutoComplete);
});