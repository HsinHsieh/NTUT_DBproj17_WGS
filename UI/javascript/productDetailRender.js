$(document).ready(function() {
    var url = new URL(window.location.href);
    var pid = url.searchParams.get("pid");

    GetProductByID(pid);
});

function GetProductByID(id){
    var apiUrl = '/product/' + id
    var callback = function(product_info) {
        $("#product_pic").attr("src", "./product_pic/"+product_info["PID"]+".jpg");
        $("#category").html(product_info["Category_Name"]+" 遊戲");
        $("#product_name").html(product_info["Product_Name"]);
        $("#price").html("NT$ "+product_info["Price"]);
        $("#description").html(product_info["Product_Description"]);
        $("#release_date").html(product_info["Formated_Date"]);
        $("#supplier").html(product_info["Supplier"]);
        $("#sys_req").html(product_info["System_Requirement"].replace(/(?:\r\n|\r|\n)/g, '<br />'));
        $("#more_description").html("<br/>"+product_info["Product_Description"]);
        console.log(product_info)
    }
    Get(apiUrl, callback);
}
