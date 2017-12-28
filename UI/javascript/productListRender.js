$(document).ready(function() {
    var url = new URL(window.location.href);
    $(document).on("click", ".add-btn", ClickAddToCart);

    var s = url.searchParams.get("s");
    if (s == null) s = url.searchParams.get("cate");

    GetItemsInGrid(s);
    GetItems(s);
    GetCategory(s);
    GetBestSell();

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
        if (msg.length == 0) {
            $("#itemList").text("　　　未找到任何商品");
        }
    }
    Get(apiUrl, callback);
};

function GetItemsInGrid(s) {
    var apiUrl = '/search/GridSearching/' + s
    var callback = function(msg) {
        $("#itemGrid").html(msg);
        if (msg.length == 0) {
            $("#itemList").text("　　　未找到任何商品");
        }
    }
    Get(apiUrl, callback);
};

function GetBestSell() {
    var apiUrl = '/query/bestSell';
    var callback = function(msg) {
        var Str = "";
        for (var i = 0; i < msg.length; i++) {
            Str += "<li> \
						<div class='e-product'> \
							<div class='pro-img'> <img src='./product_pic/" + msg[i].Item + ".jpg' alt='幹!找不到圖片'> </div> \
							<div class='pro-text-outer'> <span>Macbook, Laptop</span> \
								<a href='/product?pid=" + msg[i].Item + "'> \
									<h4> " + msg[i].Product_Name + " </h4> \
								</a> \
								<p class='wk-price'>$ " + msg[i].Price + " </p> \
							</div> \
						</div> \
					</li>"
        }
        $("#bestSell").html(Str);
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