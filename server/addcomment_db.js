const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(comment) {
        this.id = comment.PID;
        this.comment = comment.text;
        this.rating = comment.rating;
        this.customer = comment.customer;
        this.db = DataBaseController.GetDB();
    }

    GetProduct(callback){
        this.db.query("SELECT product.*, category.Category_Name, DATE_FORMAT(product.Launch_Date,'%Y-%m-%d') AS Formated_Date \
                       FROM product, category \
                       WHERE product.Category = category.CAID AND PID = '" + this.id + "'", function(error, rows, fields) {
            if (error)
                throw error;
            callback(rows[0]);
        });
    }

    PostComment(callback){
        // this.db.query("SELECT *, DATE_FORMAT(Comment_Time,'%Y-%m-%d %k:%i:%s') AS Comment_Time \
        //                FROM `comment` \
        //                WHERE `Product` = '" + this.id + "' \
        //                ORDER BY `Comment_Time` DESC", function(error, rows, fields) {
        //     if (error)
        //         throw error;
        //     callback(rows);
        // });
        callback([
            this.id,
            this.comment,
            this.rating,
            this.customer]);
    }
}
