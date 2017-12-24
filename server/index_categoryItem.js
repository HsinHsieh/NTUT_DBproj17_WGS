const DataBaseController = require('../DB/DatabaseController.js')

const item_template = "<div class='bdr col-xs-12 col-sm-12 col-md-6'style='min-height:260px;'><div class='e-product'><div class='pro-img'><img src='./product_pic/{{PID}}.jpg' alt='幹!找不到圖片' style='display:block; margin:auto; width:150px; height:200px;><div class='hover-icon'><a href='/product?pid={{PID}}'><i class='fa fa-search' aria-hidden='true'></i></a></div></div><div class='pro-text-outer'><span>{{Category}}</span><a href='/product?pid={{PID}}'><h4> {{Product_Name}} </h4></a><p class='wk-price'>NT$ {{Price}} </p><button class='add-btn addbtn' data-pid ='{{PID}}'>Add to cart</button></div></div></div>";

module.exports = class {
    constructor(tar) {
        this.db = DataBaseController.GetDB();
        this.data = "";
        //this.target = tar;
        this.queryCmd = "SELECT * FROM `product` WHERE Category = '" + tar + "'LIMIT 4";
    }


    AddItems(callback) {
        this.db.query(this.queryCmd, function(error, rows, fields) {
            //檢查是否有錯誤
            if (error)
                throw error;
            this.items = "";
            for (var i = 0; i < rows.length; i++) {
                this.data = rows[i];
                this.items += item_template //replace("{{num}}",i+1)
                    .replace("{{Category}}", this.data.Category)
                    .replace("{{Product_Name}}", this.data.Product_Name)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{PID}}", this.data.PID)
                    .replace("{{Price}}", this.data.Price);
            }
            callback(this.items);
        });
    }
}