$(document).ready(function() {
    GetNewArrival();

    $(document).on("click", ".addbtn", ClickAddToCart);


    $("#subscribe").click(function() {
        var target = $("#subscribeEmail").val();
        if (target != "") {
            swal({
                position: 'top-left',
                type: 'error',
                title: '你太醜了 我不寄給ni',
                showConfirmButton: false,
                timer: 1000
            });
        }
    });
});

function ClickAddToCart(event) {
    CheckLoginAndAdd(event.target.dataset.pid);
}

function CheckLoginAndAdd(pid) {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        //console.log(loginStatus);
        if (loginStatus == "false") {
            swal({
                position: 'top-right',
                type: 'warning',
                title: '請先登入',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            AddToCart(loginStatus, pid);
            swal({
                position: 'top-right',
                type: 'success',
                title: '你選擇的物品已經加到購物車~',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    Get(apiUrl, callback);
};

function AddToCart(cid, pid) {
    var apiUrl = '/shopping_cart/add'
    data = {
        "customer": cid,
        "pid": pid
    }
    Post(apiUrl, data, function(msg) {
        //
    });
};

function GetNewArrival() {
    var apiUrl = '/new_arrival'
    var callback = function(msg) {
        $("#new_arrival").append(msg);
    }
    Get(apiUrl, callback);
}