$(document).ready(function() {

    GetItems();
});

function GetItems() {
    var apiUrl = '/Search'
    var callback = function(msg) {
        $("#itemList").append(msg);
    }
    Get(apiUrl, callback);
}