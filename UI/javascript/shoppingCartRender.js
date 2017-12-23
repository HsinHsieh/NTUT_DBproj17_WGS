$(document).ready(function() {
    GetInfo();

    $("#clear").click(function() {
        clear();
    });

    $("#checkout").click(function() {
        checkout();
    });

    function checkout(){
        var url = '/shopping_cart/checkout';
        var data = {
            customer: 'wasd',
        };
        var callback = function (msg) {
            swal(msg);
            GetInfo();
        };
        Post(url, data);
    }

    function clear() {
        var url = '/shopping_cart/clear';
        var data = {
            customer: 'wasd'
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
            customer:'wasd',
        };
        var callback = function(msg) {
            $("#CartList").html(msg);
        };
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

});
