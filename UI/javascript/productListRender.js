$(document).ready(function() {
    var url = new URL(window.location.href);

    var s = url.searchParams.get("s");
    if (s == null) s = url.searchParams.get("cate");

    GetItemsInGrid(s);
    GetItems(s);
    GetCategory(s);
    $("#itemGrid").hide();

    $("#listbtn").click(function() {
        $("#itemList").show();
        $("#itemGrid").hide();
    });

    $("#gridbtn").click(function() {
        $("#itemList").hide();
        $("#itemGrid").show();
    });
});


function GetItems(s) {
    var apiUrl = '/search/' + s
    var callback = function(msg) {
        $("#itemList").html(msg);
    }
    Get(apiUrl, callback);
};

function GetItemsInGrid(s) {
    var apiUrl = '/search/GridSearching/' + s
    var callback = function(msg) {
        $("#itemGrid").html(msg);
    }
    Get(apiUrl, callback);
};

function GetCategory() {
    var apiUrl = '/query/productCatagory'
    var callback = function(msg) {
        var resObj = JSON.parse(msg);
        var resStr = "";
        for (var i = 0; i < resObj.length; i++) {
            resStr += "<li><a href='/search?cate=" + resObj[i].CAID + "'> 🎲" + resObj[i].Category_Name + "<span><i class='fa fa-angle-right' aria-hidden='true'></i></span></a></li>";
        }
        $("#cate").html(resStr);
    }
    Get(apiUrl, callback);
};