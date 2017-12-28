$(document).ready(function() {
    var url = new URL(window.location.href);
    var pid = url.searchParams.get("pid");

    GetProductByID(pid, url.pathname);
    GetCommentByID(pid, url.pathname);
});

function GetProductByID(id, index) {
    var apiUrl = index + '/' + id
    var callback = function(product_info) {
        $("#sys_req").html(product_info["System_Requirement"].replace(/(?:\r\n|\r|\n)/g, '<br />'));
        $("#more_description").html("<br/>" + product_info["Product_Description"]);
    }
    Get(apiUrl, callback);
};

function GetCommentByID(id, index) {
    var apiUrl = index + '/Comment/' + id
    var callback = function(comment) {
        var resStr = "";
        for (var i = 0; i < Object.keys(comment).length; i++) {
            var yellowStarts = function(Grade){
                var result = "";
                for (var i = 0; i < Grade; i++) {
                    result += "<li class='yellow-color'><i class='fa fa-star' aria-hidden='true'></i></li>";
                }
                for (var i = 0; i < 5-Grade; i++) {
                    result += "<li><i class='fa fa-star' aria-hidden='true'></i></li>";
                }
                return result;
            }(comment[i].Grade);;
            resStr +=
              "<li class='comment'>\
                  <div class='comment-body'>\
                    <div class='well well-lg'>\
                      <header class='text-left'>\
                       <div class='star2'>\
                         <ul><li class='comment-author text-uppercase reviews'><i class='fa fa-user'></i> " + comment[i].Customer + "</li>" + yellowStarts + "</ul>\
                       </div>\
                       <time class='comment-date reviews'><i class='fa fa-clock-o'></i> " + comment[i].Comment_Time + "</time>\
                       </header>\
                       <div class='comment-comment'>\
                         <p>" + comment[i].Comment_Text + "</p>\
                       </div>\
                     </div>\
                   </div>\
                 </li>";
        }
        $(".comment-list").html(resStr);
    }
    Get(apiUrl, callback);
};
