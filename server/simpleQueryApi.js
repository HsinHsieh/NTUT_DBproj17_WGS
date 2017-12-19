const sql = require('./sql.js');

module.exports = class {

    constructor(router) {
        this.router = router;
        // this.productManager = new ProductManager();
        this.SetAPI();
    }
    SetAPI() {
        this.router.get("/productCatagory", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new sql("SELECT * FROM `category`ORDER BY CAID ASC")).ReturnJson(callback);
            // res.end(JSON.stringify({success:true , data:result}));
        });
        this.router.get("/mainProductNum", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new sql("SELECT count(*) AS Pnum FROM product")).ReturnJson(callback);
        });
        this.router.get("/productSupplier", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new sql("SELECT DISTINCT Supplier FROM `product`ORDER BY Supplier ASC")).ReturnJson(callback);
        });
        this.router.post("/productSearch", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            var sqlPID = (req.body.PID == '') ? "" : " `PID` = '" + req.body.PID + "'" + " AND ";
            var sqlName = " `Product_Name` LIKE '%" + req.body.Name + "%'";
            var sqlPrice = (req.body.Price_low == '') ? "" : " AND " + " `Price` BETWEEN " + req.body.Price_low + " AND " + req.body.Price_up;
            var sqlSupplier = " AND " + " `Supplier` LIKE '%" + req.body.Supplier + "%'";
            var sqlCategory = (req.body.Category == '') ? "" : " AND " + " `Category` ='" + req.body.Category + "'";
            var sqlStr = "SELECT *  FROM `product` WHERE" + sqlPID + sqlName + sqlPrice + sqlSupplier + sqlCategory;
            // console.log(sqlStr);
            (new sql(sqlStr)).ReturnJson(callback);
        });
    }
}