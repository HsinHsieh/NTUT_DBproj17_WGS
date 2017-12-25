const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(ID) {
        this.id = ID;
        this.db = DataBaseController.GetDB();
    }

    GetProductInfo(callback){
        this.db.query("SELECT product.*, category.Category_Name, DATE_FORMAT(product.Launch_Date,'%Y-%m-%d') AS Formated_Date \
                       FROM product, category \
                       WHERE product.Category = category.CAID AND PID = '" + this.id + "'", function(error, rows, fields) {
            if (error)
                throw error;
            callback(rows[0]);
        });
    }

    GetCommentInfo(callback){
        this.db.query("SELECT * FROM `comment` ORDER BY `Comment_Time` DESC", function(error, rows, fields) {
            if (error)
                throw error;
            callback(rows);
        });
    }
}
