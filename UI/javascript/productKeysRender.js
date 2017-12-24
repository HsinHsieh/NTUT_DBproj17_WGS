$(document).ready(function() {
    CheckLogin();
});

function CheckLogin() {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        if (loginStatus == "false") {
            swal({
                position: 'top-right',
                type: 'warning',
                title: '請先登入',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            GetProductKeys(loginStatus)
        }
    }
    Get(apiUrl, callback);
};

function GetProductKeys(CID) {
    var apiUrl = '/productKeys/' + CID
    var callback = function(product_keys) {
        // console.log(product_keys)
        for (var i = 0; i < Object.keys(product_keys).length; i++) {
          if (product_keys[i].Key_Used == 0){

              product_keys[i].Key_Status = "<button class='btn btn-primary btn-block' type='button' name='button' onclick='RevealProductKey(\"" + product_keys[i].OCID + "\")'>啟用金鑰</button>"
              console.log(product_keys[i].Key_Status);
          }
          else {
              product_keys[i].Key_Status = "<p class='form-control' align='center'>" + product_keys[i].License_Key + "</p>"
          }
        }
        var resStr = "";
        for (var i = 0; i < Object.keys(product_keys).length; i++) {
          resStr += "<tr><td><p class='form-control-static'>" + product_keys[i].Order_Number + "</p></td><td><p class='form-control-static'>" + product_keys[i].Product_Name + "</p></td><td><p class='form-control-static'>" + product_keys[i].Formated_Order_Time + "</p></td><td id='key_status'>"+ product_keys[i].Key_Status +"</td></tr>";
        }
        $(".product_list").html(resStr);
    }
    Get(apiUrl, callback);
};

function RevealProductKey(_ocid){
    var apiUrl = '/productKeys/reveal';
    var data = {
        ocid : _ocid,
    };
    $("#key_status .btn").html("啟用中...");
    var callback = function(key) {
        console.log(key);
        $("#key_status").html("<p class='form-control' align='center'>" + key + "</p>")
    };
    // $("#key_status .btn").hide();
    // console.log("Revealed")
    Post(apiUrl, data, callback);
};
