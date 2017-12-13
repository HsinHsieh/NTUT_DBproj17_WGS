$(document).ready(function() {
    GetItems();
    GetCategory();
});

function GetItems() {
    var apiUrl = '/search/Searching'
    var callback = function(msg) {
        $("#itemList").html(msg);
    }
    Get(apiUrl, callback);
}

function GetCategory() {
    var apiUrl = '/query/productCatagory'
    var callback = function(msg) {
        var resObj = JSON.parse(msg);
        console.log(resObj.length);
        var resStr = "";
        for (var i = 0; i < resObj.length; i++) {
            resStr += "<li><a href='#'>" + resObj[i].Category_Name + "<span><i class='fa fa-angle-right' aria-hidden='true'></i></span></a></li>";
        }
        $("#cate").append(resStr);
    }
    Get(apiUrl, callback);
}