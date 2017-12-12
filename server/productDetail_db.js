const DataBaseController = require('../DB/DatabaseController.js')

const category_template = "{{Category_Name}}遊戲"
const product_name_template = " {{Product_Name}} "

module.exports = class {
    constructor(ID) {
        this.id = ID;
        this.db = DataBaseController.GetDB();
        this.data = null;
        this.product_info = {
              "Category_Name":"",
              "Product_Name":"",
            };
        this.category = "";
        this.product_name = "";
    }

    GetProductInfo(callback){
      this.db.query("SELECT * FROM `product` WHERE `PID` LIKE '" + this.id + "'", function(error, rows, fields) {
          if (error)
              throw error;
          this.product_info["Category_Name"] = GetProductCategoryName(rows[0].Category);
              // .replace("{{Category_Name}}", rows[0].Category);
          callback(this.product_info);
      });
    }

    GetProductCategoryName(caid){
        this.db.query("SELECT `Category_Name` FROM `category` WHERE `CAID` LIKE '" + caid +"'", function(error, rows, fields) {
            if (error)
                throw error;
            return rows[0]
        });
    }

    GetProductCategory(callback){
        this.db.query("SELECT `category`.`Category_Name`, `product`.`Product_Name` FROM `category` LEFT JOIN `product` ON `product`.`Category` = `category`.`CAID` WHERE (`product`.`Product_Name` LIKE 'Half-Life 3')", function(error, rows, fields) {
            if (error)
                throw error;
            // console.log(rows[0])
            this.category = category_template
                .replace("{{Category_Name}}", rows[0].Category_Name);
            // console.log(this.category)
            callback(this.category);
        });
    }

    GetProductName(callback){
        this.db.query("SELECT `category`.`Category_Name`, `product`.`Product_Name` FROM `category` LEFT JOIN `product` ON `product`.`Category` = `category`.`CAID` WHERE (`product`.`Product_Name` LIKE 'Half-Life 3')", function(error, rows, fields) {
            if (error)
                throw error;
            this.product_name = product_name_template
                .replace("{{Product_Name}}", rows[0].Product_Name);

            console.log(this.product_name)
            callback(this.product_name);
        });
    }
}
