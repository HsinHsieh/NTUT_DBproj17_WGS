const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(comment) {
        this.pid = comment.PID;
        this.comment = comment.text;
        this.rating = comment.rating;
        this.customer = comment.customer;
        this.coid = comment.COID;
    }

    GetProduct(callback){
        var db = DataBaseController.GetDB();
        db.query("SELECT product.*, category.Category_Name, DATE_FORMAT(product.Launch_Date,'%Y-%m-%d') AS Formated_Date \
                       FROM product, category \
                       WHERE product.Category = category.CAID AND PID = '" + this.pid + "'", function(error, rows, fields) {
            if (error)
                throw error;
            callback(rows[0]);
        });
    }

    PostComment(callback){
        var _pid = this.pid;
        var _comment = this.comment;
        var _rating = this.rating;
        var _customer = this.customer;

        var _checkcommand = "SELECT * FROM `comment` WHERE `Product` = '{{PID}}' AND `Customer` = '{{Customer}}' ORDER BY `Comment_Time` ASC"
        var checkcommand = _checkcommand.replace("{{Customer}}", _customer)
                                        .replace("{{PID}}", _pid)
        var db = DataBaseController.GetDB();
        db.query(checkcommand, function(error, rows, fields) {
            if (error)
                throw error;
            if (rows == '') {
                var _command = "INSERT INTO `comment`(`Customer`, `Product`, `Grade`, `Comment_Text`) \
                                VALUES ('{{Customer}}', '{{PID}}', '{{Rating}}', '{{Text}}')"
                var command = _command.replace("{{Customer}}", _customer)
                                      .replace("{{PID}}", _pid)
                                      .replace("{{Rating}}", _rating)
                                      .replace("{{Text}}", _comment);
                var db = DataBaseController.GetDB();
                db.query(command, function(error, rows, fields) {
                    if (error)
                        throw error;
                    callback("success")
                });
            } else {
                var _command = "UPDATE `comment` SET `Comment_Text` = '{{Text}}', `Grade` = '{{Rating}}' \
                                WHERE `Product` = '{{PID}}' AND `Customer` = '{{Customer}}'"
                var command = _command.replace("{{Customer}}", _customer)
                                      .replace("{{PID}}", _pid)
                                      .replace("{{Rating}}", _rating)
                                      .replace("{{Text}}", _comment);
                var db = DataBaseController.GetDB();
                db.query(command, function(error, rows, fields) {
                    if (error)
                        throw error;
                    callback("success")
                });
            }
        });
    }

    EditComment(callback) {
        var _command = "UPDATE `comment` SET `Comment_Text` = '{{Text}}', `Grade` = '{{Rating}}' \
                        WHERE `COID` = '{{COID}}'"
        var command = _command.replace("{{COID}}", this.coid)
                              .replace("{{Rating}}", this.rating)
                              .replace("{{Text}}", this.comment);
        var db = DataBaseController.GetDB();
        db.query(command, function(error, rows, fields) {
            if (error)
                throw error;
            callback("success")
        });
    }

    DeleteComment(callback){
        var _command = "DELETE FROM `comment` WHERE COID` = '{{COID}}'"
        var command = _command.replace("{{COID}}", this.coid)

        var db = DataBaseController.GetDB();
        db.query(command, function(error, rows, fields) {
            if (error)
                throw error;
            callback("deleted")
        });
    }
}
