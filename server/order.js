const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(sqlStr) {
        this.db = DataBaseController.GetDB();
        this.data = null;
    }

    GetOrderMain(account, callback) {
        this.db.query(
            "SELECT `OID`,`Total_Price`, DATE_FORMAT(Order_Time,'%Y-%m-%d %k:%i:%s') AS Formated_Order_Time  FROM `order_main` WHERE `Customer`= '" + account + "' AND `Status` = 1 ORDER BY order_main.OID DESC;",
            function(err, result, fields) {
                //console.log(result);
                callback(err, result);
            });
    }

    GetOrderContents(OID, callback) {
        this.db.query(
            "SELECT product.Product_Name, product.PID, order_content.Key_Used FROM order_content,product WHERE product.PID=order_content.Item AND order_content.Order_Number = '" + OID + "';",
            function(err, result, fields) {
                //console.log(result[0]);
                callback(err, result);
            });
    }

}