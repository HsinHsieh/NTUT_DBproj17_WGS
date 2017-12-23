const DataBaseController = require('../DB/DatabaseController.js')

const item_preview_template = "<div class='col-xs-12 col-sm-6 col-md-3' style='background-color:#C9E2E2'><div class='pro-text text-center' style='min-height:435px;'><a href='/product?pid={{PID}}'><div class='pro-img'><img src='./product_pic/{{PID}}.jpg ' alt='幹!找不到圖片' style='display:block; margin:auto; width:150px; height:200px;' /></a></div><div class='pro-text-outer'><span>{{Category}}</span><a href='/product?pid={{PID}}'><h4>{{Product_Name}}</h4></a><p class='wk-price'> NT$ {{Price}}</p><button class='add-btn addbtn' data-pid ='{{PID}}'>Add to cart</button></div></div></div>";

module.exports = class {
    constructor() {
        this.db = DataBaseController.GetDB();
        this.data = "";
    }

    AddItemPreview(callback) {
        this.db.query("SELECT * FROM `product` ORDER BY `product`.`Launch_Date` DESC LIMIT 16", function(error, rows, fields) {
            //檢查是否有錯誤
            if (error)
                throw error;
            this.item_preview = "";
            for (var i = 0; i < rows.length; i++) {
                this.data = rows[i];
                this.item_preview += item_preview_template //replace("{{num}}",i+1)
                    .replace("{{Product_Name}}", this.data.Product_Name)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{Category}}", this.data.Category)
                    .replace("{{Price}}", this.data.Price);
            }
            callback(this.item_preview);
        })
    }
}