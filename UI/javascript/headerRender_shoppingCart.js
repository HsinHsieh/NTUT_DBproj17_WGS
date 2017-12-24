$(document).ready(function() {
    var user;
    CheckLogin();

    function CheckLogin() {
        var apiUrl = '/login/IsLogined'
        var callback = function(loginStatus) {
            this.user = loginStatus;
            GetItems();
        };
        Get(apiUrl, callback);
    };

    function GetItems () {
        var url = '/shopping_cart/items';
        var data = {
            customer: this.user,
        };
        var callback = function (data) {
            result = "";
            for (var i = 0; i < data.length; i++) {
                var p = data[i];
                result += "<div class='cart-content'>\
                            <div class='col-sm-4 col-md-4'><a href='/product?pid=" + p.pic + "'><img src='./product_pic/"+ p.pic + ".jpg' alt='幹找不到圖片' style='width:68px; height:100px; display:inline-block;'></a></div>\
                            <div class='col-sm-8 col-md-8'> \
                              <div class='pro-text'> <a href='#'>" + p.name + "</a>\
                                <div class='close'>x</div> <strong>$" + p.price + "</strong>\
                              </div>\
                            </div>\
                           </div>";
           }
            $("#HeaderCart").html(result);
            GetTotal();
        };
        Post(url, data, callback)
    };

    function GetTotal () {
        var url = '/shopping_cart/total';
        var data = {
            customer: this.user,
        };
        var callback = function (msg) {
            $("#header_cart_total").html(msg);
        };
        Post(url, data, callback)
    }
});
