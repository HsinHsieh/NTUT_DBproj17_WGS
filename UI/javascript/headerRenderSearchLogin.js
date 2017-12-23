$(document).ready(function() {
    GetCategory();
    CheckLogin();
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
    if (target != "")
        window.location = '/search?s=' + encodeURIComponent(target);
});

function CheckLogin() {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        //console.log(loginStatus);
        if (loginStatus == "false") {
            $("#loginBtn").show();
            $("#logoutBtn").hide();
            $('#hellouser').text("登入或註冊");
        } else {
            $("#loginBtn").hide();
            $("#logoutBtn").show();
            $('#hellouser').text(loginStatus);
        }
    }
    Get(apiUrl, callback);
};

$("#loginBtn").click(function() {
    var {
        value: formValues
    } = swal({
        title: 'Login',
        html: '<input id="acc" type="email" maxlength="20" placeholder="帳 號" value="" class="swal2-input">' +
            '<input id="psw" type="password"  placeholder="密 碼" value="" class="swal2-input">',
        focusConfirm: true,
        preConfirm: () => {
            var data = {
                "account": ($('#acc').val()),
                "password": ($('#psw').val())
            }
            console.log(JSON.stringify(data));
            Post('/login', data, function(msg) {
                swal(msg);
                CheckLogin();
            });
        }
    });
});

$("#logoutBtn").click(function() {
    Get('/login', function(msg) {
        swal(msg);
        CheckLogin();
    });
    $('#hellouser').text("登入或註冊");
});