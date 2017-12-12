const DataBaseController = require('../DB/DatabaseController.js')

const item_preview_template = "<div class='col-xs-12 col-sm-6 col-md-3'><div class='pro-text text-center'><div class='pro-img'><img src='./product_pic/{{PID}}.jpg ' alt='幹!找不到圖片' width='180' height='250' /></div><div class='pro-text-outer'><span>{{Category}}</span><a href='{{url}}'><h4>{{Product_Name}}</h4></a><p class='wk-price'> NT$ {{Price}}</p><a href='#' class='add-btn'>Add to cart</a></div></div></div>"

module.exports = class {
    constructor() {
        this.db = DataBaseController.GetDB();
        this.data = "";
    }

    AddItemPreview(callback) {
        this.db.query("SELECT * FROM `product` ORDER BY `product`.`Launch_Date` ASC LIMIT 16", function(error, rows, fields) {
            //檢查是否有錯誤
            if (error)
                throw error;
            this.item_preview = "";
            for (var i = 0; i < rows.length; i++) {
                this.data = rows[i];
                this.item_preview += item_preview_template //replace("{{num}}",i+1)
                    .replace("{{Product_Name}}", this.data.Product_Name)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{Category}}", this.data.Category)
                    .replace("{{Price}}", this.data.Price);
            }
            callback(this.item_preview);
        })
    }
}