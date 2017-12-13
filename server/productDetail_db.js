const DataBaseController = require('../DB/DatabaseController.js')

const category_template = "{{Category_Name}}遊戲"
const product_name_template = " {{Product_Name}} "

module.exports = class {
    constructor(ID) {
        this.id = ID;
        this.db = DataBaseController.GetDB();
        this.data = null;
        this.category = "";
        this.product_name = "";
    }

    GetProductInfo(callback){
        this.db.query("SELECT product.*, category.Category_Name, DATE_FORMAT(product.Launch_Date,'%Y-%m-%d') AS Formated_Date FROM product, category WHERE product.Category = category.CAID AND PID = '" + this.id + "'", function(error, rows, fields) {
            if (error)
                throw error;
            callback(rows[0]);
        });
    }
}
