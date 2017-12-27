$(document).ready(function() {
    $("#loginBtn").hide();
    $("#logoutBtn").hide();
    CheckLogin();
});

function LoginRequest() {
    var {
        value: formValues
    } = swal({
        title: 'Admin Login',
        html: '<div>本管理系統僅限管理人員使用</div>' +
            '<input id="acc" type="email" maxlength="20" placeholder="帳 號(Email)" value="" class="swal2-input">' +
            '<input id="psw" type="password"  placeholder="密 碼" value="" class="swal2-input">',
        focusConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        preConfirm: () => {
            var data = {
                "account": ($('#acc').val()),
                "password": ($('#psw').val())
            }
            //console.log(JSON.stringify(data));
            Post('/login/loginAdmin', data, function(msg) {
                swal(msg).then(function() {
                    CheckLogin();
                })
            });
        }
    });
};

function CheckLogin() {
    var apiUrl = '/login/IsLoginedAdmin'
    var callback = function(loginStatus) {
        //console.log(loginStatus);
        if (loginStatus == "false") {
            LoginRequest();
        } else {
            $("#logoutBtn").show();
            $('#hellouser').text("管理員:  " + loginStatus);
        }
    }
    Get(apiUrl, callback);
};

$("#logoutBtn").click(function() {
    Get('/login', function(msg) {
        swal(msg).then(function() {
            CheckLogin();
            window.location = '/admin';
        });
    });
});