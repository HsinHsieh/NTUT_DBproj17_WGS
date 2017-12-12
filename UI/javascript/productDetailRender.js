$(document).ready(function() {

    // var attribute = HashToNameAndColor(location.hash);
    // $('#main img').attr('src','./image/'+ attribute.Name + "_" + attribute.Color + ".jpg");
    // GetProductByName(attribute.Name);

    // GetProductByID('STG0000001');
    // GetProductCategory();
    // GetProductName();
});

function GetProductByID(id){
    var apiUrl = '/product/' + id
    var callback = function(product_info) {
        $("#category").html(product_info["Category_Name"]);
        $("#product_name").html(product_info["Product_Name"]);
    }
    Get(apiUrl, callback);
}

function GetProductCategory() {
    var apiUrl = '/product/category'
    var callback = function(msg) {
        $("#category").html(msg);
    }
    Get(apiUrl, callback);
}

function GetProductName() {
    var apiUrl = '/product/name'
    var callback = function(msg) {
        $("#product_name").html(msg);
    }
    Get(apiUrl, callback);
}
