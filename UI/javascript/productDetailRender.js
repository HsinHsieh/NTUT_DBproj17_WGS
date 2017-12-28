$(document).ready(function() {
    var url = new URL(window.location.href);
    var pid = url.searchParams.get("pid");

    GetProductByID(pid);
    GetCommentCount(pid);

    $(".addtocart2").click(function() {
        CheckLoginAndAdd(pid);
    });

    $("#add_comment").click(function() {
        CheckLoginAndComment(pid);
    });

});

function Tocomment() {
    $("#commentBtn").click();
}

function GetCommentCount(id) {
    var apiUrl = '/product/Comment/' + id
    var callback = function(num) {
        $("#comment_count").html("<i class='fa fa-commenting-o' aria-hidden='true'></i> " + num.length + " comment(s)");
        var avg_star = 0;
        for (var i = 0; i < num.length; i++) {
            avg_star += num[i].Grade;
        }
        avg_star = Math.round(avg_star / num.length * 10) / 10;
        var starPercentage = avg_star / 5 * 100 + "%";
        $(".stars-inner").attr("style", "width: " + starPercentage + ";");
        $(".stars-value").html(avg_star);
    };
    Get(apiUrl, callback);
};

function GetProductByID(id) {
    var apiUrl = '/product/' + id
    var callback = function(product_info) {
        $("#product_pic").attr("src", "./product_pic/" + product_info["PID"] + ".jpg");
        $("#category").html(product_info["Category_Name"] + " 遊戲");
        $("#product_name").html(product_info["Product_Name"]);
        $("#price").html("NT$ " + product_info["Price"]);
        $("#description").html(product_info["Product_Description"]);
        $("#release_date").html(product_info["Formated_Date"]);
        $("#supplier").html(product_info["Supplier"]);
    }
    Get(apiUrl, callback);
};

function CheckLoginAndAdd(pid) {
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
            AddToCart(loginStatus, pid);
            swal({
                position: 'top-right',
                type: 'success',
                title: '你選擇的物品已經加到購物車~',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    Get(apiUrl, callback);
};

function CheckLoginAndComment(pid) {
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
            window.location = "/addcomment?pid=" + pid;
        }
    }
    Get(apiUrl, callback);
};

function AddToCart(cid, pid) {
    var apiUrl = '/shopping_cart/add'
    data = {
        "customer": cid,
        "pid": pid
    }
    Post(apiUrl, data, function(msg) {
        //
    });
};