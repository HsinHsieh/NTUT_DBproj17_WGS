const DataBaseController = require('../DB/DatabaseController.js')

const item_template = "<div class='col-xs-12 col-sm-12 col-md-12'><div class='pro-text'><div class='col-xs-12 col-sm-5 col-md-5'><div class='pro-img'> <img src='assets/images/products/digital/2.jpg' alt='2'><sup class='sale-tag'>sale!</sup><div class='hover-icon'> <a href='#'><span class='icon icon-Heart'></span></a> <a href='#'><span class='icon icon-Search'></span></a> <a href='#'><span class='icon icon-Restart'></span></a> </div></div></div><div class='col-xs-12 col-sm-7 col-md-7'><div class='pro-text-outer list-pro-text'><span>{{Category}}</span><a href='#'><h4>{{Product_Name}}</h4></a><p class='wk-price'>$ {{Price}}</p><p>{{Product_Description}}</p><a href='#' class='add-btn'>Add to cart</a><a href='#' class='add-btn2'><span class='icon icon-Heart'></span></a><a href='#' class='add-btn2'><span class='icon icon-Restart'></span></a></div></div></div></div>";

module.exports = class {
    constructor() {
        this.db = DataBaseController.GetDB();
        this.data = "";
    }

    AddItems(callback) {
        this.db.query("SELECT * FROM `product` ORDER BY `product`.`Launch_Date` ASC LIMIT 16", function(error, rows, fields) {
            //檢查是否有錯誤
            if (error)
                throw error;
            this.items = "";
            for (var i = 0; i < rows.length; i++) {
                this.data = rows[i];
                this.items += item_preview_template //replace("{{num}}",i+1)
                    .replace("{{Category}}", this.data.Category)
                    .replace("{{Product_Name}}", this.data.Product_Name)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{Price}}", this.data.Price)
                    .replace("{{Product_Description}}", this.data.Product_Description);
            }
            callback(this.items);
        })
    }
}