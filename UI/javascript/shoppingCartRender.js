$(document).ready(function() {
    var user;
    CheckLogin();

    $("#clear").click(function() {
        clear();
    });

    $("#checkout").click(function() {
        checkout();
    });

    $(document).on("click", ".e04", cancel);

    function cancel(event) {
        var url = '/shopping_cart/cancel';
        var data = {
            OCID: event.target.dataset.ocid,
        };
        var callback = function(msg) {
            swal({
                position: 'top-right',
                type: 'success',
                title: msg,
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                window.location = '/shopping_cart';
            });
        }
        Post(url, data, callback);
    }

    function checkout() {
        var url = '/shopping_cart/checkout';
        var data = {
            customer: this.user,
            total: $("#total_price").data('total'),
            discount: $("#discount_price").data('discount'),
        };
        var callback = function(msg) {
            swal(msg).then(function() {
                window.location = '/';
            });
        };
        Post(url, data, callback);
    }

    function clear() {
        var url = '/shopping_cart/clear';
        var data = {
            customer: this.user,
        };
        var callback = function(msg) {
            swal(msg).then(function() {
                window.location = '/shopping_cart';
            });
        };
        Post(url, data, callback);
    }

    function GetItems() {
        var url = '/shopping_cart/items';
        var data = {
            customer: this.user,
        };
        var callback = function(data) {
            var result = "<tr><th></th><th>Product name</th><th>Price</th><th>Cancel</th></tr>"
            for (var i = 0; i < data.length; i++) {
                var p = data[i];
                var pic = "<td><a href='/product?pid=" + p.pic + "'><img src='./product_pic/" + p.pic + ".jpg'" + "' alt='幹找不到圖片' style='width:165px; height:240px'></a></td>";
                var name = "<td style='font-size:20px;'>" + p.name + "</td>";
                var price = "<td><strong>$" + p.price + "</strong></td>";
                result += "<tr>" + pic + name + price;
                result += "<td ><span class='red'>\
                            <i class='e04 fa fa-times' aria-hidden='true' style='cursor:pointer;' data-OCID='" + p.ocid + "'></i>\
                            </span></td></tr>";
            }
            $("#CartList").html(result);
        };

        Post(url, data, callback);
        GetTotal();
    }


    function GetDiscount() {
        var url = '/shopping_cart/discount';
        var data = {
            customer: this.user,
        };
        var callback = function(msg) {
            var result = "<div id='discount_price' data-discount='" + msg + "'></div> - $" + msg;
            $("#cart_discount").html(result);
            GetFinal();
        };

        Post(url, data, callback);
    }

    function GetTotal() {
        var url = '/shopping_cart/total';
        var data = {
            customer: this.user,
        };

        var callback = function(msg) {
            var result = "<div id='total_price' data-total='" + msg + "'></div>$" + msg;
            $("#total").html(result);
            GetDiscount();
        }

        Post(url, data, callback);
    }

    function GetFinal() {
        var total = parseInt($("#total_price").data('total'));
        var discount = parseInt($("#discount_price").data('discount'));
        var final = (total - discount).toString();
        $("#final_price").html(final);
    }

    function CheckLogin() {
        var apiUrl = '/login/IsLogined'
        var callback = function(loginStatus) {
            if (loginStatus == "false") {
                swal({
                    position: 'top-right',
                    type: 'warning',
                    title: '請先登入',
                    showConfirmButton: true,
                    timer: 1500,
                }).then(function() {
                    window.location = "/";
                });
            } else {
                this.user = loginStatus;
                GetItems();
            }
        };
        Get(apiUrl, callback);
    };

});