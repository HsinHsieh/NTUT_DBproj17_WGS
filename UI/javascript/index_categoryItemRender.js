$(document).ready(function() {
    GetCategory();
    GenerateBlocks();
});

function GetCategory() {
    var apiUrl = '/query/productCatagory'
    var callback = function(msg) {
        var resObj = JSON.parse(msg);
        var resStr = "<li class='active'><a data-toggle='tab' href='#" + resObj[0].CAID + "'>" + resObj[0].Category_Name + "</a></li>";
        for (var i = 1; i < resObj.length; i++) {
            resStr += "<li><a data-toggle='tab' href='#" + resObj[i].CAID + "'>" + resObj[i].Category_Name + "</a></li>";
        }
        $("#cateTab").html(resStr);
    }
    Get(apiUrl, callback);
};

function GetItemsInBlocks(cate) {
    var apiUrl = '/categoryItemRAND/' + cate;
    var callback = function(msg) {
        $("#" + cate).html(msg);
    }
    Get(apiUrl, callback);
};

function GenerateBlocks() {
    var apiUrl = '/query/productCatagory'
    var callback = function(msg) {

        var resObj = JSON.parse(msg);
        var resStr = "<div id='" + resObj[0].CAID + "' class='tab-pane fade in active'><div class='owl-demo-outer'><div id='owl-demo3' class='deals-wk2'><div id='" + resObj[0].CAID + "items' class='item'></div></div></div></div>";
        GetItemsInBlocks(resObj[0].CAID);
        for (var i = 1; i < resObj.length; i++) {
            resStr += "<div id='" + resObj[i].CAID + "' class='tab-pane fade in'><div id='owl-demo13' class='deals-wk2'><div id='" + resObj[i].CAID + "items' class='item'></div></div></div>";
            GetItemsInBlocks(resObj[i].CAID);
        }
        $("#contentsForCate").html(resStr);
    }
    Get(apiUrl, callback);
};