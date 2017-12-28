var Data;

$(document).ready(function() {
    CheckLoginAndShow();
    GenerateBlocks();

    $(document).on("click", "#modifyBtn", modifyBtnHandle);
    $(document).on("click", "#pswBtn", pswBtnHandle);
    $(document).on("click", "#editbutton", EditComment);
    $(document).on("click", "#deletebutton", DeleteComment);

    $('#myfile').click(function() {
        CheckLoginAndShow();
        $("#contentsForPersonal").load("../personalCenter/myfile.html");
    });
    $('#historyOrder').click(function() {
        GenerateBlocks();
        $("#contentsForPersonal").load("../personalCenter/historyOrder.html");
    });
    $('#myComments').click(function() {
        GetMyComments();
        $("#contentsForPersonal").load("../personalCenter/myComments.html");
    });
});

//myfile
function modifyBtnHandle() {
    var Data = {
        "CID": $('#myfile_CID').val(),
        "First_Name": $('#myfile_First_Name').val(),
        "Last_Name": $('#myfile_Last_Name').val(),
        "Gender": $('#myfile_Gender').val(),
        "Phone": $('#myfile_Phone').val(),
        "Birthday": $('#myfile_Birthday').val(),
        "Email": $('#myfile_Email').val(),
        "Adress": $('#myfile_Adress').val(),
    }
    Post('/login/modifyData', Data, function(msg) {
        console.log("修改狀態 : " + msg);
        if (msg == "successed") {
            swal({
                title: 'All done!',
                html: '<div>你已經完成一個修改的動作</div>',
                confirmButtonText: '繼續使用!'
            })
        } else {
            swal(
                'Oops...',
                '修改時發生錯誤!請再試一次!',
                'error'
            )
        }
    });
};

function pswBtnHandle() {
    var {
        value: formValues
    } = swal({
        title: '修改密碼',
        html: '<input id="psw" type="password" placeholder="密 碼" value="" class="swal2-input">' +
            '<input id="pswagain" type="password"  placeholder="請再輸入一次 密 碼" value="" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {

        }
    }).then(function() {
        if ($('#psw').val() != $('#pswagain').val()) {
            swal("兩次不一樣喔")
        } else {
            this.Data = {
                "CID": ($('#myfile_CID').val()),
                "Password": ($('#psw').val())
            }
            swal({
                title: 'Are you sure?',
                text: "將會改變你的密碼",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    console.log(this.Data);
                    Post('/login/modifyPsw', this.Data, function(msg) {
                        console.log("修改狀態 : " + msg);
                        if (msg == "successed") {
                            swal({
                                title: 'All done!',
                                html: '<div>你已經完成一個修改的動作</div>' + '<div>重新登入以繼續使用</div>',
                                confirmButtonText: '繼續使用!'
                            }).then(function() {
                                this.Data = "";
                                //登出
                                Get('/login', function(msg) {
                                    window.location = '/';
                                });
                            });
                        } else {
                            swal(
                                'Oops...',
                                '修改時發生錯誤!請再試一次!',
                                'error'
                            )
                        }
                    });
                } else if (result.dismiss === 'cancel') {
                    swal(
                        'Cancelled',
                        '取消了一個修改的動作',
                        'error'
                    )
                }
            });
        }
    })
};

function CheckLoginAndShow() {
    var apiUrl = '/login/IsLogined'
    var callback = function(loginStatus) {
        //console.log(loginStatus);
        if (loginStatus == "false") {
            swal({
                position: 'center',
                type: 'warning',
                title: '請先登入',
                showConfirmButton: true,
                timer: 1500,
            }).then(function() {
                window.location = "/";
            });
        } else {
            AskMemberData();
        }
    }
    Get(apiUrl, callback);
};

function AskMemberData() {
    var apiUrl = '/login/memberData'
    var callback = function(Data) {
        //console.log(Data)
        $('#myfile_CID').val(Data.CID);
        $('#myfile_Register_Date').val(Data.Formated_Register_Date);
        $('#myfile_First_Name').val(Data.First_Name);
        $('#myfile_Last_Name').val(Data.Last_Name);
        $('#myfile_Gender').val(Data.Gender);
        $('#myfile_Phone').val(Data.Phone);
        $('#myfile_Birthday').val(Data.Birthday);
        $('#myfile_Email').val(Data.Email);
        $('#myfile_Adress').val(Data.Adress);
    }
    Get(apiUrl, callback);
};



function GenerateBlocks() {
    var apiUrl = '/personal/GetOrderMains'
    var callback = function(msg) {
        var resStr = "";
        for (var i = 0; i < msg.length; i++) {
            resStr +=
                "<div class='well'> \
                <div class='row'> \
                    <div class='form-group col-md-4'> \
                        <label for='Name'>訂單編號</label> \
                        <input type='text' readonly class='form-control' value='" + msg[i].OID + "'> \
                    </div> \
                    <div class='form-group col-md-4'> \
                        <label for='Name'>訂購時間</label> \
                        <input type='text' readonly class='form-control'  value='" + msg[i].Formated_Order_Time + "'> \
                    </div> \
                    <div class='form-group col-md-4'> \
                        <label for='Name'>總價</label> \
                        <input type='text' readonly class='form-control'  value='" + msg[i].Total_Price + "'> \
                    </div> \
                </div> \
                <div class='row'> \
                    <table class='table table-striped'> \
                        <thead> \
                            <tr> \
                                <th class='col-xs-9'>商品名稱</th> \
                                <th class='col-xs-3'>金鑰使用狀態</th> \
                            </tr> \
                        </thead> \
                        <tbody id='" + "contents-" + msg[i].OID + "' class='product_list'> \
                        </tbody>\
                    </table>\
                </div>\
            </div>";

            GetItemsInBlocks(msg[i].OID);
        }
        $("#orderMainBlocks").html(resStr);
    }
    Get(apiUrl, callback);
};

function GetItemsInBlocks(OID) {
    var apiUrl = '/personal/GetOrderContents/' + OID;
    var callback = function(msg) {
        var Block = "";
        var keyStatus = "已使用";
        for (var i = 0; i < msg.length; i++) {
            if (msg[i].Key_Used == 1)
                keyStatus = "已使用";
            else
                keyStatus = "未使用";

            Block += "<tr> \
                   <td><a href='/product?pid=" + msg[i].PID + "' target='_blank'><p class='form-control-static'>" + msg[i].Product_Name + "</p></a></td> \
                   <td><p class='form-control-static'>" + keyStatus + "</p></td> \
                   </tr>";
        }
        $("#contents-" + OID).html(Block);
    }
    Get(apiUrl, callback);
};

function GetMyComments() {
    var apiUrl = '/addcomment/get';
    var data;
    var _table;
    var _commentBlock = "<div class='comment-body'> \
                          <div class='well well-lg'> \
                            <header class='text-left'> \
                              <div class='star2'> \
                                <ul> \
                                  <li class='comment-author text-uppercase reviews'><i class='fa fa-user'></i> {{User}}</li> \
                                  {{Stars}} \
                                </ul> \
                              </div> \
                              <time class='comment-date reviews'><i class='fa fa-clock-o'></i> {{Time}}</time> \
                            </header> \
                            <div class='comment-comment'> \
                              <p>{{Text}}</p> \
                            </div> \
                            <div class='row'> \
                              <div class='col-md-10'></div> \
                              <div class='col-md-1'> \
                                <button id='editbutton' class='btn btn-primary pull-right' data-pid='{{PID}}'>修改</button> \
                              </div> \
                              <div class='col-md-1'> \
                                <button id='deletebutton' class='btn btn-danger pull-right' data-coid='{{COID}}'>刪除</button> \
                              </div> \
                            </div> \
                          </div> \
                        </div>";
    var callback = function(comments) {
        for (var i = 0; i < comments.length; i++)  {
            var result = '';
            for (var j = 0; j < comments[i].Grade; j++) {
                result += "<li class='yellow-color'><i class='fa fa-star' aria-hidden='true'></i></li>";
            }
            for (var j = 0; j < 5-comments[i].Grade; j++) {
                result += "<li><i class='fa fa-star' aria-hidden='true'></i></li>";
            }
            var commentBlock = _commentBlock.replace("{{Stars}}", result)
                                            .replace("{{User}}", comments[i].Customer)
                                            .replace("{{Time}}", comments[i].Formated_Date_Time)
                                            .replace("{{Text}}", comments[i].Comment_Text)
                                            .replace("{{PID}}", comments[i].Product)
                                            .replace("{{COID}}", comments[i].COID);
            _table += "<tr style='cursor: pointer;' data-toggle='collapse' data-target='#show_" + comments[i].COID + "' class='accordion-toggle'>" +
            "<td><p class='form-control-static'>" + comments[i].COID +
            "</p></td><td><p class='form-control-static'>" + comments[i].Product_Name +
            "</p></td><td><p class='form-control-static'>" + comments[i].Formated_Date_Time +
            "</p></td></tr>"+
            "<tr><td colspan='6' style='padding: 0;'><div class='accordian-body collapse' id='show_" + comments[i].COID + "'>"+commentBlock+"</div></td></tr>";

            // $("#show_"+comments[i].COID).html(commentBlock);
        }
        $("#my_comments").html(_table);
        // $("div[id^='show_']").on("click", GetCommentByCOID(COID));
    }
    Post(apiUrl, data, callback)
}

function EditComment(event){
    window.location.href = "/addcomment?pid=" + event.target.dataset.pid;

}

function DeleteComment(event){
    swal({
        title: '確定要刪除此評論嗎？',
        text: "此動作無法復原",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '算了'
    }).then(function(result){
        if(result.value) {
            var apiUrl = '/addcomment/delete/' + event.target.dataset.coid;
            var data;
            var callback = function(msg) {
                if(msg == "deleted") {
                    swal({
                        title: '已刪除該評論',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $("tr[data-target='#show_"+event.target.dataset.coid+"']").remove();
                    $("#show_"+event.target.dataset.coid).remove();
                }
            }
            Post(apiUrl, data, callback)
        }
    });
}
