const Product = require('./product')
const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(router) {
        this.router = router;
        this.products = [];
        this.productsInfo = [];
        this.SetAPI();
    }

    SetAPI() {
        this.router.post("/add", function(req, res) {
            var customer = req.body.customer;

            var command = "SELECT order_main.OID FROM order_main \
                        WHERE order_main.Status = 0 AND order_main.Customer='" + customer + "'";


            var db = DataBaseController.GetDB();
            var callback = function(error, rows, fields) {
                if (error)
                    throw error;
                var insert = function(error, rows, fields){
                    command = "INSERT INTO `order_content`(`Item`, `Order_Number`) VALUES ('" + req.body.pid + "','" + rows[0].OID + "')";
                    db.query(command, function(error, rows, fields) {
                        if (error)
                            throw error;
                    });
                }
                if (rows == null) {
                    command = "INSERT INTO 'order_main' {'Customer','Status'} VALUES ('" + this.customer + "', 0)";
                    db.query(command,insert);
                } else {
                    insert(error, rows, fields);
                }
            };

            db.query(command, callback);
            res.send('Product is added to shopping cart');
        });

        this.router.post("/items", function(req, res) {
            var result = "<tr><th></th><th>Product name</th><th>Price</th><th></th></tr>"
            var callback = function(error, rows, fields) {
                if (error)
                    throw error;
                for (var i = 0; i < rows.length; i++) {
                    var p = rows[i];
                    var pic = "<td><img src='./product_pic/" + p.PID + ".jpg'" +"' alt='幹找不到圖片' style='width:150px; height:240px'></td>";
                    var name = "<td>"+ p.Product_Name + "</td>";
                    var price = "<td><strong>$" + p.Price.toString() + "</strong></td>";
                    result += "<tr>" + pic + name + price;
                    result += "<td><span class='red'><i class='fa fa-times' aria-hidden='true'></i></span></td></tr>";
                }
                res.send(result);
            };

            var customer = req.body.customer;
            var command =  "SELECT product.PID, product.Product_Name, product.Price \
                            FROM order_main, order_content, product \
                            WHERE order_content.Order_Number = order_main.OID AND order_content.Item = product.PID \
                            AND order_main.Customer = 'wasd' AND order_main.Status = 0";
            var db = DataBaseController.GetDB();
            db.query(command, callback);
        });
    }

}
