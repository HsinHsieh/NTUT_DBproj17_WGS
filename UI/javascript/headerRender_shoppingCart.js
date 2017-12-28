$(document).ready(function() {
    var user;
    CheckLogin();

    $("#header_cart_btn").click(function() {
        GetItems();
    });

    $("#header_cart_btn").hover(function() {
        GetItems();
    });

    $("#header_checkout").click(function() {
        swal({
            title: 'Are you sure?',
            text: "將馬上進行付款!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, 刷下去!',
            cancelButtonText: 'No, 我87我按錯!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                checkout();
            } else if (result.dismiss === 'cancel') {
                swal(
                    '別考慮了',
                    '想要的東西終究是會買的',
                    'error'
                )
            }
        })
    });

    function checkout() {
        var url = '/shopping_cart/checkout';
        var data = {
            customer: this.user,
            total: $("#header_total_price").data('total'),
            discount: $("#header_discount_price").data('discount'),
        };
        var callback = function(msg) {

            if (msg == "Checkout success!") {
                swal(
                    '你買到惹!',
                    '恩 花錢不手軟 成功一大半',
                    'success'
                ).then(function() {
                    GetItems();
                    // window.location = '/';
                });
            }

        }
        Post(url, data, callback);
    }

    function CheckLogin() {
        var apiUrl = '/login/IsLogined'
        var callback = function(loginStatus) {
            if (loginStatus == "false")
                return
            this.user = loginStatus;
            GetItems();
        };
        Get(apiUrl, callback);
    };
});

function GetItems() {
    var url = '/shopping_cart/items';
    var data = {
        customer: this.user,
    };
    var callback = function(data) {
        if (data.length == 0) {
            result = "";
            $("#header_checkout").attr("style", "pointer-events: none;");
            $("#header_checkout").text("空空如也!");
        } else {
            $("#header_checkout").attr("style", "pointer-events: true;");
            $("#header_checkout").text("快速結帳");
            result = "";
            for (var i = 0; i < data.length; i++) {
                var p = data[i];
                result += "<div class='cart-content'>\
                        <div class='col-sm-4 col-md-4'><a href='/product?pid=" + p.pic + "'><img src='./product_pic/" + p.pic + ".jpg' alt='幹找不到圖片' style='width:68px; height:100px; display:inline-block;'></a></div>\
                        <div class='col-sm-8 col-md-8'> \
                          <div class='pro-text'> <a href='#'>" + p.name + "</a>\
                             <strong>$" + p.price + "</strong>\
                          </div>\
                        </div>\
                       </div>";
            }
        }
        $("#HeaderCart").html(result);
        GetTotal();
    };
    Post(url, data, callback)
};

function GetTotal() {
    var url = '/shopping_cart/total';
    var data = {
        customer: this.user,
    };
    var callback = function(msg) {
        var result = "<div id='header_total_price' data-total='" + msg + "'></div>$" + msg;
        $("#header_cart_total").html(result);
        GetDiscount();
    };
    Post(url, data, callback);
};

function GetDiscount() {
    var url = '/shopping_cart/discount';
    var data = {
        customer: this.user,
    };
    var callback = function(msg) {
        var result = "<div id='header_discount_price' data-discount='" + msg + "'></div> - $" + msg;
        $("#header_cart_discount").html(result);
        GetFinal();
    };
    Post(url, data, callback);
};

function GetFinal() {
    var total = parseInt($("#header_total_price").data('total'));
    var discount = parseInt($("#header_discount_price").data('discount'));
    var final = "$" + (total - discount).toString();
    $("#header_cart_final").html(final);
}