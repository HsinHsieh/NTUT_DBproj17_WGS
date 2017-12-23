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
            });
            GetInfo();
        }
        Post(url, data, callback);
    }

    function checkout() {
        var url = '/shopping_cart/checkout';
        var data = {
            customer: user,
        };
        var callback = function(msg) {
            swal(msg);
            GetInfo();
        };
        Post(url, data);
    }

    function clear() {
        var url = '/shopping_cart/clear';
        var data = {
            customer: user,
        };
        var callback = function(msg) {
            swal(msg);
            GetInfo();
        };
        Post(url, data, callback);
    }

    function GetInfo() {
        GetItems();
    }

    function GetItems() {
        var url = '/shopping_cart/items';
        var data = {
            customer: this.user,
        };
        var callback = function(msg) {
            $("#CartList").html(msg);
        };

        console.log(this.user);
        Post(url, data, callback);
        GetTotal(data);
    }

    function GetTotal(data) {
        var url = '/shopping_cart/total';

        var callback = function(msg) {
            $("#total").html(msg);
        }

        Post(url, data, callback);
    }

    function CheckLogin() {
        var apiUrl = '/login/IsLogined'
        var callback = function(loginStatus) {
            //console.log(loginStatus);
            if (loginStatus == "false") {
                swal({
                    position: 'top-right',
                    type: 'warning',
                    title: '請先登入',
                    showConfirmButton: true,
                    timer: 1500,
                }).then(function () {
                    window.location = "/";
                });
            } else {
                this.user = loginStatus;
                console.log(this.user);
                GetInfo();
            }
        };
        Get(apiUrl, callback);
    };

});
