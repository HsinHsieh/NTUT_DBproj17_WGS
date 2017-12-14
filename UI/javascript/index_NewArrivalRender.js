$(document).ready(function() {
    GetNewArrival();

    $(".addbtn").click(function() {
        alert("已加到購物車!");
    });
});

function GetNewArrival() {
    var apiUrl = '/new_arrival'
    var callback = function(msg) {
        $("#new_arrival").append(msg);
    }
    Get(apiUrl, callback);
}