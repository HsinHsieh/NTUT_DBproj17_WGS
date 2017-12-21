$(document).ready(function() {
    GetItems();
});


function Calculate() {
    var total = 0;
    function CartTotal(){

    };
}

function GetInfo() {
    var apiUrl = '/shopping_cart/get';
    var callback = function(msg) {
        $("#CartList").html(msg);
    };
    Get(apiUrl, callback);
}

function PutItems() {
    var url = '/shopping_cart/add';
    var data = {
        pid: 'ACT0000015',
        customer: 'wasd'
    }
    var callback = function(msg) {
        alert(msg)
    }
    Post(url, data, callback);
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
}
