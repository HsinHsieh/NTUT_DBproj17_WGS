$(document).ready(function() {
    GetCategory();

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

$("#loginBtn").click(function() {
    var {
        value: formValues
    } = swal({
        title: 'Login',
        html: '<input id="acc" type="email" class="swal2-input">' +
            '<input id="psw" type="password" class="swal2-input">',
        focusConfirm: true,
        preConfirm: () => {
            return [
                $('#acc').val(),
                $('#psw').val()
            ]
        }
    })
});