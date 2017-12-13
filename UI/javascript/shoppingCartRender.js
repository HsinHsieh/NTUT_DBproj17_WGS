$(document).ready(function() {
    GetInfo();
});

function GetInfo() {
    var apiUrl = '/shopping_cart/get';
    var callback = function(msg) {
        $("#CartList").html(msg);
    };
    Get(apiUrl, callback);
}
