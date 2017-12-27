const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(comment) {
        this.pid = comment.PID;
        this.comment = comment.text;
        this.rating = comment.rating;
        this.customer = comment.customer;
        this.coid = comment.COID;
        this.db = DataBaseController.GetDB();
    }

    GetProduct(callback){
        this.db.query("SELECT product.*, category.Category_Name, DATE_FORMAT(product.Launch_Date,'%Y-%m-%d') AS Formated_Date \
                       FROM product, category \
                       WHERE product.Category = category.CAID AND PID = '" + this.pid + "'", function(error, rows, fields) {
            if (error)
                throw error;
            callback(rows[0]);
        });
    }

    PostComment(callback){
        var _command = "INSERT INTO `comment`(`Customer`, `Product`, `Grade`, `Comment_Text`) \
                        VALUES ('{{Customer}}', '{{PID}}', '{{Rating}}', '{{Text}}')"
        var command = _command.replace("{{Customer}}", this.customer)
                              .replace("{{PID}}", this.pid)
                              .replace("{{Rating}}", this.rating)
                              .replace("{{Text}}", this.comment)
        this.db.query(command, function(error, rows, fields) {
            if (error)
                throw error;
            // callback("success")
        });
    }

    EditComment(callback){

    }
}
