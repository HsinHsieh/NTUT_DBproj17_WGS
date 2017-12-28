const DataBaseController = require('../DB/DatabaseController.js');

module.exports = class {
    constructor() {
        this.db = DataBaseController.GetDB();
        this.data = null;
    }

    AddBestSell(callback) {
        var command = "SELECT order_content.Item,COUNT(*),product.Price,product.Product_Name \
                        FROM order_content,product \
                        WHERE order_content.Item = product.PID \
                        GROUP By order_content.Item   \
                        ORDER BY `COUNT(*)` DESC LIMIT 5";
        this.db.query(
            command,
            function(err, result, fields) {
                callback(err, result);
            });
    };
}