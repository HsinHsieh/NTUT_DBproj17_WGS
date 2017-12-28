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
            }).then(function() {
                window.history.back()
            });
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
    }
    Get(apiUrl, callback);
};

function PostComment() {
    var com = $("#commentform").serializeObject();
    var pid = new URL(window.location.href).searchParams.get("pid");
    var apiUrl = '/addcomment/submit/' + pid;
    var data = {
        PID: pid,
        comment: com["comment"],
        rating: com["rating"]
    };
    var callback = function(msg) {
        if (msg == "success") {
            swal({
                type: 'success',
                title: '評論張貼成功',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                window.location = "/product?pid=" + pid;
            });
        }
    };
    Post(apiUrl, data, callback);
}