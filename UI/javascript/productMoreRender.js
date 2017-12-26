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
          resStr += "<tr><td><p class='form-control-static'>" + comment[i].Customer + "</p></td> \
                         <td><p class='form-control-static'>" + comment[i].Grade + "</p></td> \
                         <td><p class='form-control-static'>" + comment[i].Comment_Text + "</p></td> \
                         <td><p class='form-control-static'>" + comment[i].Comment_Time + "</p></td></tr>";
        }
        $(".comment_list").html(resStr);
    }
    Get(apiUrl, callback);
};
