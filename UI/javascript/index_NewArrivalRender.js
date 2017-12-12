$(document).ready(function() {

    GetNewArrival();
});

function GetNewArrival() {
    var apiUrl = '/new_arrival'
    var callback = function(msg) {
        $("#new_arrival").append(msg);
    }
    Get(apiUrl, callback);
}