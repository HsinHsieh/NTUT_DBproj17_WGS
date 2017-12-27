$(document).ready(function() {
    var url = new URL(window.location.href);
    var pid = url.searchParams.get("pid");

    GetProductByID(pid);

    /* star rate */
    var logID = 'log',
    log = $('<div id="'+logID+'"></div>');
    $('body').append(log);
      $('[type*="radio"]').change(function () {
        var me = $(this);
        log.html(me.attr('value'));
      });
});

function GetProductByID(id) {
    var apiUrl = '/addcomment/' + id
    var callback = function(product_info) {
        $("#product_pic").attr("src", "./product_pic/" + product_info["PID"] + ".jpg");
        $("#product_name").html(product_info["Product_Name"]);
    }
    Get(apiUrl, callback);
};

function PostComment() {
    var com = $('#commentform').serializeObject();
    console.log(com);
    var apiUrl = '/addcomment/submit'
    // var data = {
    //   PID: url.searchParams.get("pid");,
    //   comment: ,
    //   rating:
    // }
    // Post(apiUrl, data, )
}
