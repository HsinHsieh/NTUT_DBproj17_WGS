$(document).ready(function() {

    // var attribute = HashToNameAndColor(location.hash);
    // $('#main img').attr('src','./image/'+ attribute.Name + "_" + attribute.Color + ".jpg");
    // GetProductByName(attribute.Name);

    GetProductByName();
});

function GetProductByName() {
    var apiUrl = '/new_arrival'
    var callback = function(msg) {
        $("#new_arrival").append(msg);
    }
    Get(apiUrl, callback);
}