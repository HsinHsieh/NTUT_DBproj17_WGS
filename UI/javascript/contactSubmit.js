
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    console.log("fuck you");
    return o;
  };


function clickContackSubmit() {
  //var data = $("#form1").serializeArray(); //自动将form表单封装成json
  //alert(JSON.stringify(data));
  var jsonUserInfo = $('#form1').serializeObject();
  alert(JSON.stringify(jsonUserInfo));
  console.log("fuck");
}

/*
1.serialize（）方法
　　格式：var data = $（“＃formID”）。Serialize（）;
　　功能：將表單內容序列化成一個字符串。
　　這樣在ajax提交表單數據時，就不用一一列舉出每一個參數。只需將data參數設置為$("form").serialize()即可。

2.serializeArray（）方法
　　格式：var jsonData = $（“＃formID”）。SerializeArray（）;
　　功能：將頁面表單序列化成一個JSON結構的對象。注意不是JSON字符串。
　　比如，[{"name":"lihui"},{...}] 獲取數據為jsonData[0].name

3.$.param()方法，可以把json格式數據序列化成字符串形式
      varobj = {A 1，B 2}
      vars = $。param（obj）;
  會形成a=1&b=2的形式
*/
