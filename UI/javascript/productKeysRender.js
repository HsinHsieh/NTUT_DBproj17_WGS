$(document).ready(function() {
    CheckLogin();
});

function CheckLogin() {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        if (loginStatus == "false") {
            swal({
                position: 'top-right',
                type: 'warning',
                title: '請先登入',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            GetProductKeys(loginStatus)
        }
    }
    Get(apiUrl, callback);
};

function GetProductKeys(CID) {
    var apiUrl = '/productKeys/' + CID
    var callback = function(product_keys) {

    }
}
