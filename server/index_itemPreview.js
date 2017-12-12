const DataBaseController = require('../DB/DatabaseController.js')

const item_preview_template = "<div class='col-xs-12 col-sm-6 col-md-4'><div class='pro-text text-center'><div class='pro-img'><img src='./product_pic/{{Product_Name}}.jpg ' alt='幹!找不到圖片' width='200' height='300' /></div><div class='pro-text-outer'><span>{{Category}}</span><a href='{{url}}'><h4>{{Product_Name}}</h4></a><p class='wk-price'> NT$ {{Price}}</p><a href='#' class='add-btn'>Add to cart</a></div></div></div>"

module.exports = class {
    constructor() {
        this.db = DataBaseController.GetDB();
        this.data = "";
    }

    // AddItemPreview(attribute, callback) {
    //     this.db.query('SELECT * FROM `product`', function(error, rows, fields) {
    //         //檢查是否有錯誤
    //         if (error)
    //             throw error;
    //         this.data = rows;
    //         console.log(rows[0].PID);
    //         showAItemPreviewOnHome();
    //     })
    // }

    // this.db.query("SELECT * FROM `product` ORDER BY `product`.`Launch_Date` ASC LIMIT 16", function(error, rows, fields) {
    //     //檢查是否有錯誤
    //     if (error)
    //         throw error;
    //     this.item_preview = "";
    //     for (i = 0; i < row.count; i++) {
    //         this.item_preview = item_preview_template //replace("{{num}}",i+1)
    //             .replace("{{Product_Name}}", rows[i].Product_Name)
    //             .replace("{{Product_Name}}", rows[i].Product_Name)
    //             .replace("{{Category}}", rows[i].Category)
    //             .replace("{{Price}}", rows[i].Price);
    //     }


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
                    .replace("{{Product_Name}}", this.data.Product_Name)
                    .replace("{{Category}}", this.data.Category)
                    .replace("{{Price}}", this.data.Price);
            }
            callback(this.item_preview);
        })
    }

    // showAItemPreviewOnHome() {
    //     var item_preview = item_preview_template //replace("{{num}}",i+1)
    //         .replace("{{Product_Name}}", this.data.Product_Name)
    //         .replace("{{Category}}", this.data.Category)
    //         .replace("{{Price}}", this.data.Category);
    //     console.log(item_preview);
    //     return item_preview;
    //     // $("#new_arrival").append(item_preview);
    // };
}


// var item_preview = "<div class='col-xs-12 col-sm-6 col-md-3'><div class='pro-text text-center'><div class='pro-img'><img src='assets/images/new-arrivals-img.jpg ' alt='2' /></div><div class='pro-text-outer'><span>Macbook, Laptop</span><a href='shop-detail.html'><h4> Apple Macbook Retina 23’ </h4></a><p class='wk-price'>$290.00 </p><a href='#' class='add-btn'>Add to cart</a></div></div></div>"
//
// $("#new_arrival").append(item_preview);