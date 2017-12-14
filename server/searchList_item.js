const DataBaseController = require('../DB/DatabaseController.js')

const item_template_list = "<div class='col-xs-12 col-sm-12 col-md-12'><div class='pro-text'><div class='col-xs-12 col-sm-5 col-md-5'><div class='pro-img'> <img src='./product_pic/{{PID}}.jpg ' alt='幹!找不到圖片' style='display:block; margin:auto; width:200px'><div class='hover-icon'> <a href='#'><span class='icon icon-Heart'></span></a> <a href='#'><span class='icon icon-Search'></span></a> <a href='#'><span class='icon icon-Restart'></span></a> </div></div></div><div class='col-xs-12 col-sm-7 col-md-7'><div class='pro-text-outer list-pro-text'><span>{{Category}}</span><a href='/product?pid={{PID}}'><h4>{{Product_Name}}</h4></a><p class='wk-price'> NT$ {{Price}}</p><p>{{Product_Description}}</p><a href='#' class='add-btn'>Add to cart 🛒</a> <a href='#' class='add-btn2'><span class='icon icon-Heart'></span></a> <a href='#' class='add-btn2'><span class='icon icon-Restart'></span></a></div></div></div></div>";

const item_template_grid = "<div class='col-xs-12 col-sm-6 col-md-3'><div class='pro-text text-center'><div class='pro-img'><img src='./product_pic/{{PID}}.jpg ' alt='幹!找不到圖片' style='display:block; margin:auto; width:120px; height:160px;' /></div><div class='pro-text-outer'><span>{{Category}}</span><a href='/product?pid={{PID}}'><h4>{{Product_Name}}</h4></a><p class='wk-price'> NT$ {{Price}}</p><a href='#' class='add-btn'>Add to cart</a></div></div></div>";

module.exports = class {
    constructor(tar) {
        this.db = DataBaseController.GetDB();
        this.data = "";
        //this.target = tar;
        this.queryCmd = "SELECT * FROM `product` WHERE `Product_Name` LIKE '%" + tar + "%'";
        console.log(this.queryCmd);
    }

    AddItems(callback) {
        this.db.query(this.queryCmd, function(error, rows, fields) {
            //檢查是否有錯誤
            if (error)
                throw error;
            this.items = "";
            for (var i = 0; i < rows.length; i++) {
                this.data = rows[i];
                this.items += item_template_list //replace("{{num}}",i+1)
                    .replace("{{Category}}", this.data.Category)
                    .replace("{{Product_Name}}", this.data.Product_Name)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{Price}}", this.data.Price)
                    .replace("{{Product_Description}}", this.data.Product_Description);
            }
            callback(this.items);
        });
    }

    AddItemsInGrid(callback) {
        this.db.query(this.queryCmd, function(error, rows, fields) {
            //檢查是否有錯誤
            if (error)
                throw error;
            this.items = "";
            for (var i = 0; i < rows.length; i++) {
                this.data = rows[i];
                this.items += item_template_grid //replace("{{num}}",i+1)
                    .replace("{{Category}}", this.data.Category)
                    .replace("{{Product_Name}}", this.data.Product_Name)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{Price}}", this.data.Price);
            }
            callback(this.items);
        });
    }
}