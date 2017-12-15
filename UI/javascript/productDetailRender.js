$(document).ready(function() {
    var url = new URL(window.location.href);
    var pid = url.searchParams.get("pid");

    GetProductByID(pid);

    $(".addtocart2").click(function() {
        swal({
            position: 'top-right',
            type: 'success',
            title: '你選擇的物品已經加到購物車~',
            showConfirmButton: false,
            timer: 1500
        });
    });
});

function GetProductByID(id) {
    var apiUrl = '/product/' + id
    var callback = function(product_info) {
        $("#product_pic").attr("src", "./product_pic/" + product_info["PID"] + ".jpg");
        $("#category").html(product_info["Category_Name"] + " 遊戲");
        $("#product_name").html(product_info["Product_Name"]);
        $("#price").html("NT$ " + product_info["Price"]);
        $("#description").html(product_info["Product_Description"]);
        $("#release_date").html(product_info["Formated_Date"]);
        $("#supplier").html(product_info["Supplier"]);
        $("#sys_req").html(product_info["System_Requirement"].replace(/(?:\r\n|\r|\n)/g, '<br />'));
        $("#more_description").html("<br/>" + product_info["Product_Description"]);
    }
    Get(apiUrl, callback);
};