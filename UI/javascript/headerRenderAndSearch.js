$(document).ready(function() {
    GetCategory();
});

function GetCategory() {
    var apiUrl = '/query/productCatagory'
    var callback = function(msg) {
        var resObj = JSON.parse(msg);
        var resStr = "";
        for (var i = 0; i < resObj.length; i++) {
            resStr += "<li><a href='/search?cate=" + resObj[i].CAID + "'>  🎮   " + resObj[i].Category_Name + "  <sup class='bg-red'>hot!</sup></a></li>";
        }
        $("#cateMenu").html(resStr);
    }
    Get(apiUrl, callback);
};

$("#btnSearch").click(function() {
    var target = $("#headerSearch").val();
    window.location = '/search?s=' + target;
});