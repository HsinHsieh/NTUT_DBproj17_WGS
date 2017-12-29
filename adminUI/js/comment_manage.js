// const product_search_row = "'<tr><th scope='row'>1</th<td>ACT0000007</td><td>{{Product_Name}}</td><td>{{Category}}</td><td>{{Price}}</td><td><button class='btn btn-primary' type='button' name='button' onclick="location.href=">編輯</button></td><td><button class='btn btn-danger' type='button' name='button'>刪除</button></td></tr>"
$(document).ready(function() {
    var commentRow = function(msg) {
        var resStr = "";
        var resObj = JSON.parse(msg);
        console.log(msg);
        for (var i = 0; i < Object.keys(resObj).length; i++) {
            resStr += "'<tr><th scope='row'>" + (i + 1) + "</th><td>" + resObj[i].COID + "</td><td>" + resObj[i].Customer + "</td><td>" + resObj[i].Product_Name + "</td><td>" + resObj[i].Grade + "</td><td>" + resObj[i].Comment_Text +
                "</td><td><button class='btn btn-danger' type='button' id='productDeleteButton' data-OCID ='" + resObj[i].COID + "'>刪除</button></td></tr>";
        }
        $(".product_list").html(resStr);
    }

    var productDelete = function(msg) {
        var resObj = JSON.parse(msg);
        var Str = "商品編號：" + resObj[0].PID + "<br>商品名稱：" + resObj[0].Product_Name + "<br>供應商：" + resObj[0].Supplier + "<br>上市日期：" + resObj[0].Launch_Date;
        $('.productDeleteContent').html(Str);
        var PicStr = "<img src=\"/product_pic/" + resObj[0].PID + ".jpg\" alt=\"NO PICTURE\" class=\"img-thumbnail\">"
        $('.productDeletePic').html(PicStr);
    }
    var productDeleteResult = function(msg) {
        resObj = JSON.parse(msg);
        if ('errno' in resObj) {
            $('#productDeleteModalTitle').html("操作結果");
            $('#productDeleteModalBody').html("刪除作業失敗!!錯誤代碼：" + resObj.errno);
            $('#productDeleteModalFooter').html("<button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">確認</button>")

        } else {
            $('#productDeleteModalTitle').html("操作結果");
            $('#productDeleteModalBody').html("刪除作業完成");
            $('#productDeleteModalFooter').html("<button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\">確認</button>")

        }
    }
    var productFetch = function() {
        var data = {
            "COID": ($('#commentSearch_COID').val()),
            "PID": ($('#commentSearch_PID').val()),
            "Product_Name": ($('#commentSearch_name').val()),
            "CID": ($('#commentSearch_CID').val()),
            "grade_ceiling": ($('#commentSearch_grade_ceiling').val()),
            "grade_floor": ($('#commentSearch_grade_floor').val()),
            "date_ceiling": ($('#commentSearch_date_ceiling').val()),
            "date_floor": ($('#commentSearch_date_floor').val()),
            "keyword": ($('#commentSearch_keyword').val()),
        };
        Post('/admin/api/commentSearch', data, commentRow);
    }
    var productDeleteModalSet = function() {
        $('#productDeleteModalTitle').html("是否確認刪除以下產品?");
        $('#productDeleteModalBody').html("	<div class=\"row\"><div class=\"col-md-6\"><div class=\"productDeleteContent\"></div></div><div class=\"col-md-6\"><div class=\"productDeletePic\"> </div></div></div>");
        $('#productDeleteModalFooter').html("");
        $('#productDeleteModalFooter').append("<input type=\"hidden\" id=\"productDeletePID\" value=\"\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button><button type=\"button\" class=\"btn btn-danger productDeleteConfirm\">確認</button>")
    }
    $('.productDeleteConfirm').click(function() {
        Get('/admin/api/prouctDelete/' + $('#productDeletePID').val(), productDeleteResult);
    })
    $("#commentSearch").click(productFetch);
    $("#filterClear").click(function() {
        $('#commentSearch_PID').val("");
        $('#commentSearch_name').val("");
        $('#commentSearch_CID').val("");
        $('#commentSearch_COID').val("");
        $('#commentSearch_keyword').val("");
        $('#commentSearch_grade_ceiling').val("");
        $('#commentSearch_grade_floor').val("");
        $('#commentSearch_date_ceiling').val("");
        $('#commentSearch_date_floor').val("");
    });
    $('#productDeleteModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget)
        var pid = button.data('pid')
        var modal = $(this)
        $('#productDeletePID').val(pid);
        Get('/admin/api/productEdit/' + pid, productDelete);
        //modal.find('.modal-title').text('刪除商品' + pid)
        //modal.find('.modal-body input').val(pid)
    });
    $('#productDeleteModal').on('hidden.bs.modal', function(event) {
        productFetch();
        productDeleteModalSet();
        $('.productDeleteConfirm').click(function() {
            Get('/admin/api/prouctDelete/' + $('#productDeletePID').val(), productDeleteResult);
        })
    })
});