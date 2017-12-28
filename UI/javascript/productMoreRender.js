const COMMENTS_PER_PAGE = 3;

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
        if (comment.length == 0) {
            var resStr = "<div>本商品未存在任何評論 快來寫下你的評論吧!</div>";
        } else {
            var resStr = "";
            for (var i = 1; i <= Math.ceil(Object.keys(comment).length/COMMENTS_PER_PAGE); i++) {
                resStr += MakeCommentPage(i, comment);
            }
            resStr += MakePageTags(Object.keys(comment).length);
        }
        $("#comment").html(resStr);
    }
    Get(apiUrl, callback);
};

function MakeCommentPage(pageNo, comment) {
  var result = "";
  if (pageNo == 1) {
    result += "<div id='comment-page1' class='tab-pane fade in active'><ul>";
  } else {
    result += "<div id='comment-page" + pageNo + "' class='tab-pane fade'><ul>";
  }
  for (var i = 0; i < COMMENTS_PER_PAGE; i++) {
    var index = (pageNo-1)*COMMENTS_PER_PAGE + i;
    if(comment[index]) {
      result += MakeCommentBox(comment[index].Customer, comment[index].Grade, comment[index].Comment_Time, comment[index].Comment_Text);
    }
  }
  result += "</ul></div>"
  return result;
}

function MakeCommentBox(author, grade, date, text) {
  var yellowStarts = function(Grade) {
      var result = "";
      for (var i = 0; i < Grade; i++) {
          result += "<li class='yellow-color'><i class='fa fa-star' aria-hidden='true'></i></li>";
      }
      for (var i = 0; i < 5 - Grade; i++) {
          result += "<li><i class='fa fa-star' aria-hidden='true'></i></li>";
      }
      return result;
  }(grade);
  var comment =
     "<li class='comment'>\
        <div class='comment-body'>\
          <div class='well well-lg'>\
            <header class='text-left'>\
             <div class='star2'>\
               <ul><li class='comment-author text-uppercase reviews'><i class='fa fa-user'></i> " + author + "</li>" + yellowStarts + "</ul>\
             </div>\
             <time class='comment-date reviews'><i class='fa fa-clock-o'></i> " + date + "</time>\
             </header>\
             <div class='comment-comment'>\
               <p>" + text + "</p>\
             </div>\
           </div>\
         </div>\
       </li>";
  return comment;
}

function MakePageTags(commentNum) {
  var result = "";
  if (commentNum > COMMENTS_PER_PAGE) {
    result += "<div class='col-xs-12 col-sm-12 col-md-12 text-right'>"
    result += "<ul class='pagination'>";
    result += "<li class='active'><a data-toggle='tab' href='#comment-page1'>1</a></li>"
    for (var i = 2; i <= Math.ceil(commentNum/COMMENTS_PER_PAGE); i++) {
      result += "<li><a data-toggle='tab' href='#comment-page" + i + "'>" + i + "</a></li>";
    }
    result += "</ul>";
  }
  return result;
}
