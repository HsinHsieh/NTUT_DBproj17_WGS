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
    else {
        swal({
            type: 'warning',
            title: '你打空白4要找屁喔?',
            showConfirmButton: false,
            timer: 1000
        });
    }
});

function CheckLogin() {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        //console.log(loginStatus);
        if (loginStatus == "false") {
            $("#loginBtn").show();
            $("#registerBtn").show();
            $("#logoutBtn").hide();
            $("#personalCenter").hide();
            $('#hellouser').text("請登入或註冊");
        } else {
            $("#loginBtn").hide();
            $("#registerBtn").hide();
            $("#logoutBtn").show();
            $("#personalCenter").show();
            $('#hellouser').text("你好!想來點糞game嗎?  " + loginStatus);
        }
    }
    Get(apiUrl, callback);
};

function MustLogin() {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        //console.log(loginStatus);
        if (loginStatus == "false") {
            $("#HeaderCartDropdown").hide();
            swal({
                type: 'warning',
                title: '請先登入',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            $("#HeaderCartDropdown").show();
            GetItems();
        }
    }
    Get(apiUrl, callback);
};

$("#loginBtn").click(function() {
    var {
        value: formValues
    } = swal({
        title: 'Login',
        html: '<input id="acc" type="email" maxlength="20" placeholder="帳 號(Email)" value="" class="swal2-input">' +
            '<input id="psw" type="password"  placeholder="密 碼" value="" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            var data = {
                "account": ($('#acc').val()),
                "password": ($('#psw').val())
            }
            //console.log(JSON.stringify(data));
            Post('/login', data, function(msg) {
                swal(msg);
                CheckLogin();
            });
        }
    });
});

$("#registerBtn").click(function() {
    swal({
        title: 'Register',
        text: '請設定你的登入帳號',
        input: 'email',
        inputPlaceholder: '本欄必須為Email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
            var data = {
                "email": email,
            }
            Post('/login/ifMemberExist', data, function(msg) {
                if (msg == "true") swal("使用者已存在，請重新註冊");
                else {
                    swal.setDefaults({
                        input: 'text',
                        confirmButtonText: 'Next',
                        showCancelButton: true,
                        progressSteps: ['1', '2', '3', '4', '5']
                    })

                    var steps = [{
                            title: 'Password',
                            input: 'password',
                            text: '請設定你的密碼',
                            inputPlaceholder: '本欄必填，小於30個英文或數字字元',
                            inputValidator: (value) => {
                                return !value && 'You need to write something!'
                            },
                            inputAttributes: {
                                'maxlength': 30,
                                'autocapitalize': 'off',
                                'autocorrect': 'off'
                            },
                            allowOutsideClick: false
                        },
                        {
                            title: 'First Name',
                            input: 'text',
                            text: '請設定你的名字',
                            inputPlaceholder: '本欄必填，小於25字元',
                            inputValidator: (value) => {
                                return !value && 'You need to write something!'
                            },
                            inputAttributes: {
                                'maxlength': 25,
                                'autocapitalize': 'off',
                                'autocorrect': 'off'
                            },
                            allowOutsideClick: false
                        },
                        {
                            title: 'Last Name',
                            input: 'text',
                            text: '請設定你的姓氏',
                            inputPlaceholder: '本欄必填，小於25字元',
                            inputValidator: (value) => {
                                return !value && 'You need to write something!'
                            },
                            inputAttributes: {
                                'maxlength': 25,
                                'autocapitalize': 'off',
                                'autocorrect': 'off'
                            },
                            allowOutsideClick: false
                        },
                        {
                            title: 'Phone',
                            input: 'text',
                            text: '請設定你的連絡電話',
                            inputPlaceholder: '本欄必填，小於10字元',
                            inputValidator: (value) => {
                                return !value && 'You need to write something!'
                            },
                            inputAttributes: {
                                'maxlength': 10,
                                'autocapitalize': 'off',
                                'autocorrect': 'off'
                            },
                            allowOutsideClick: false
                        },
                        {
                            title: 'Gender',
                            input: 'radio',
                            text: '請設定你的性別',
                            inputOptions: {
                                1: '男',
                                0: '女',
                                2: '都不4',
                            },
                            inputPlaceholder: '本欄必填',
                            inputValidator: (value) => {
                                return !value && 'You need to choose something!'
                            },
                            allowOutsideClick: false
                        },
                    ]

                    swal.queue(steps).then((result) => {
                        swal.resetDefaults()
                        if (result.value) {
                            var RegisterData = {
                                "CID": email,
                                "Password": result.value[0],
                                "First_Name": result.value[1],
                                "Last_Name": result.value[2],
                                "Phone": result.value[3],
                                "Gender": result.value[4],
                            }
                            Post('/login/Register', RegisterData, function(msg) {
                                console.log("註冊狀態 : " + msg);
                                if (msg == "successed") {
                                    swal({
                                        title: 'All done!',
                                        html: 'Your account: <pre>' + email + '</pre>' + '<div>你已經可以進行一個使用的動作</div>',
                                        confirmButtonText: '開始使用!'
                                    })
                                } else {
                                    swal(
                                        'Oops...',
                                        '註冊時發生錯誤!請再試一次!',
                                        'error'
                                    )
                                }
                            });
                        }
                    })
                }
            });
            // return new Promise((resolve) => {
            //     setTimeout(() => {
            //         if (email === 'taken@example.com') {
            //             swal.showValidationError(
            //                 'This email is already taken.'
            //             )
            //         }
            //         resolve()
            //     }, 2000)
            // })
        },
        allowOutsideClick: false
    })
    // .then((result) => {
    //     if (result.value) {
    //         swal({
    //             type: 'success',
    //             title: 'Ajax request finished!',
    //             html: 'Submitted email: ' + result.value
    //         })
    //     }
    // })
});

$("#logoutBtn").click(function() {
    Get('/login', function(msg) {
        swal(msg).then(function() {
            CheckLogin();
            window.location.reload();
        });
    });
});