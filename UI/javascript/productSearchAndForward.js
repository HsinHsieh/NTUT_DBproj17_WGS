$(document).ready(function() {

    GetItems();
});

function GetItems() {
    var apiUrl = '/search/Searching'
    var callback = function(msg) {
        $("#itemList").html(msg);
        //console.log(msg);
    }
    Get(apiUrl, callback);
}