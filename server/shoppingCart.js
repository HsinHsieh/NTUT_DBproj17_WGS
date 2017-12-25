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
        this.router.get("/", function(req, res) {
            res.sendfile('./UI/shopping-cart.html', function(err) {
                if (err) res.send(404);
            });
        });

        this.router.post("/add", function(req, res) {
            var customer = req.body.customer;

            var command = "SELECT order_main.OID FROM order_main \
                        WHERE order_main.Status = 0 AND order_main.Customer='" + customer + "'";


            var db = DataBaseController.GetDB();
            var callback = function(error, rows, fields) {
                if (error)
                    throw error;
                var insert = function(error, rows, fields) {
                    command = "INSERT INTO `order_content`(`Item`, `Order_Number`) VALUES ('" + req.body.pid + "','" + rows[0].OID + "')";
                    db.query(command, function(error, rows, fields) {
                        if (error)
                            throw error;

                    });
                }
                if (rows.length == 0) {
                    command = "INSERT INTO order_main (Customer, Status) VALUES ('" + customer + "', 0)";
                    db.query(command, function(error, rows, fields) {
                        if (error)
                            throw error;
                    });

                    command = "SELECT order_main.OID FROM order_main \
                                WHERE order_main.Status = 0 AND order_main.Customer='" + customer + "'";
                    var callback = function(error, rows, fields) {
                        if (error)
                            throw error;
                        insert(error, rows, fields);
                    }
                    db.query(command, callback);
                } else {
                    insert(error, rows, fields);
                }
            };

            db.query(command, callback);
            res.send('Product is added to shopping cart');
        });

        var GetItemsData = function(req, res) {
            var customer = req.body.customer;
            var callback = function(error, rows, fields) {
                if (error)
                    throw error;
                var data = [];
                for (var i = 0; i < rows.length; i++) {
                    var p = rows[i];
                    var row = {}
                    row['pic'] = p.PID;
                    row['name'] = p.Product_Name;
                    row['price'] = p.Price.toString();
                    row['ocid'] = p.OCID;
                    data.push(row);
                }
                res.send(data);
            };
            var customer = req.body.customer;
            var command = "SELECT product.PID, product.Product_Name, product.Price, order_content.OCID \
                            FROM order_main, order_content, product \
                            WHERE order_content.Order_Number = order_main.OID AND order_content.Item = product.PID \
                            AND order_main.Customer = '" + customer + "' AND order_main.Status = 0";
            var db = DataBaseController.GetDB();
            db.query(command, callback);
        }


        this.router.post("/items", GetItemsData);

        var calculate = function (customer) {
            var command = "SELECT product.Price \
                            FROM product, order_main, order_content \
                            WHERE order_main.Customer='" + customer + "' \
                                AND order_content.Order_Number = order_main.OID\
                                AND product.PID = order_content.Item \
                                AND order_main.Status = 0";
            var db = DataBaseController.GetDB();
            var callback = function(error, rows, rields) {
                if (error) {
                    throw error;
                }
                var price = 0;
                for (var i = 0; i < rows.length; i++) {
                    price += rows[i].Price;
                }
                return price;
            }
            db.query(command, callback)
        }

        var GetTotal = function (req, res) {
            var total = calculate(req.body.customer);
            res.send("$" + total.toString());
        }

        this.router.post("/total", function(req, res) {
            var command = "SELECT product.Price \
                            FROM product, order_main, order_content \
                            WHERE order_main.Customer='" + req.body.customer + "' \
                                AND order_content.Order_Number = order_main.OID\
                                AND product.PID = order_content.Item \
                                AND order_main.Status = 0";


            var db = DataBaseController.GetDB();
            var callback = function(error, rows, rields) {
                if (error) {
                    throw error;
                }
                var price = 0;
                for (var i = 0; i < rows.length; i++) {
                    price += rows[i].Price;
                }
                res.send(price.toString());
            }
            db.query(command, callback)
        });

        this.router.post("/discount", function (req, res) {
            var command = "SELECT event.Discount_Rate, event.Event_Category, product.Price\
                            FROM event, order_main, order_content, product\
                            WHERE order_main.Customer = '" + req.body.customer + "' AND order_content.Order_Number = order_main.OID AND \
                                product.PID = order_content.Item AND product.Category = event.Target AND order_main.Status = 0";

            var db = DataBaseController.GetDB();
            var discount = 0;
            var callback = function(error, rows, fields) {
                for (var i = 0; i < rows.length; i++) {
                    discount += (1 - rows[i].Discount_Rate) * rows[i].Price;
                }
                res.send(Math.round(discount).toString());
            };
            db.query(command, callback);
        });

        this.router.post("/clear", function(req, res) {
            var command = "SELECT order_main.OID\
                        FROM order_main\
                        WHERE order_main.Customer='" + req.body.customer + "' AND order_main.Status = 0";

            var db = DataBaseController.GetDB();
            var clear = function(error, rows, fields) {
                if (error) {
                    throw error;
                }
                res.send("Deletion success!");
            }
            var callback = function(error, rows, fields) {
                if (rows.length == 0) {
                    res.send("");
                }
                else {
                    var delCommand = "DELETE FROM order_main\
                                WHERE order_main.OID = " + rows[0].OID;
                    db.query(delCommand, clear);
                }
            }

            db.query(command, callback);
        });

        this.router.post("/checkout", function(req, res) {
            var command = "UPDATE order_main \
                            SET order_main.Status=1 , order_main.Discount = "
                                + req.body.discount + ", order_main.Total_Price = "
                                + req.body.total + "\
                            WHERE order_main.Customer = '" + req.body.customer +
                            "' AND order_main.Status = 0";
            var db = DataBaseController.GetDB();

            var callback = function(error, rows, fields) {
                if (error) {
                    throw error;
                }
                res.send("Checkout success!")
            }
            db.query(command, callback);
        });

        this.router.post("/cancel", function(req, res) {
            var ocid = req.body.OCID;
            var command = "DELETE FROM order_content WHERE order_content.OCID = " + parseInt(ocid);

            var db = DataBaseController.GetDB();
            var callback = function(error, rows, fields) {
                if (error) {
                    throw error;
                }
                res.send("Canceled")
            };

            db.query(command, callback);
        });
    }

}
