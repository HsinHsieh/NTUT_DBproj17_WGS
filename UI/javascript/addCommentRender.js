$(document).ready(function() {
    var url = new URL(window.location.href);
    var pid = url.searchParams.get("pid");

    GetProductByID(pid);
    GetAccount();

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
        return o;
    };
});

function GetAccount() {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        if (loginStatus == "false") {
            swal({
                position: 'top-right',
                type: 'warning',
                title: '請先登入',
                showConfirmButton: false,
                timer: 1500
            }).then(history.back());
        } else {
            $("#username").html(loginStatus);
        }
    }
  Get(apiUrl, callback);
}

function GetProductByID(id) {
    var apiUrl = '/addcomment/' + id
    var callback = function(product_info) {
        $("#product_pic").attr("src", "./product_pic/" + product_info["PID"] + ".jpg");
        $("#product_name").html(product_info["Product_Name"]);
        $("#commentform").attr("action", "/addcomment/submit/" + product_info["PID"]);
        $("#commentform").attr("onsubmit", "PostComment('" + product_info["PID"] + "')");
    }
    Get(apiUrl, callback);
};
