$(document).ready(function() {
    CheckLoginFirst();

    $(document).on("click", ".btn.btn-primary.btn-block", function(event){
        var apiUrl = '/productKeys/reveal';
        var data = {
            ocid : event.target.dataset.ocid,
        };
        $(event.target).html("啟用中...");
        var callback = function(key) {
            $(event.target).parent().html("<p class='form-control' align='center' style='display: none;'>" + key + "</p>")
            $("td p").fadeIn(400)
        };
        Post(apiUrl, data, callback);
    })
});

function CheckLoginFirst() {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        if (loginStatus == "false") {
            swal({
                type: 'warning',
                title: '請先登入',
                showConfirmButton: false,
                timer: 1500
            }).then(function(){
                window.location = "/";
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
        for (var i = 0; i < Object.keys(product_keys).length; i++) {
          if (product_keys[i].Key_Used == 0)
              product_keys[i].Key_Status = "<button class='btn btn-primary btn-block' type='button' name='button' data-ocid='" + product_keys[i].OCID + "'>啟用金鑰</button>"
          else
              product_keys[i].Key_Status = "<p class='form-control' align='center'>" + product_keys[i].License_Key + "</p>"
        }
        var resStr = "";
        for (var i = 0; i < Object.keys(product_keys).length; i++) {
          resStr += "<tr><td><p class='form-control-static'>" + product_keys[i].Order_Number + "</p></td><td><p class='form-control-static'>" + product_keys[i].Product_Name + "</p></td><td><p class='form-control-static'>" + product_keys[i].Formated_Order_Time + "</p></td><td>"+ product_keys[i].Key_Status +"</td></tr>";
        }
        if (resStr != "") {
          $(".product_list").html(resStr);
        }
        else {
          $(".product_list").parent().parent().append("<div style='text-align: center;'>你沒有任何金鑰購買紀錄ㄛ，趕快敗下去吧！</div>");
        }
    }
    Get(apiUrl, callback);
};
