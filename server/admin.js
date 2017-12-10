const path = require('path');
const url = require('url');
const sql = require('./admin/sql.js');

module.exports = class {

  constructor(router) {
    this.router = router;
    // this.productManager = new ProductManager();
    this.SetAPI();
  }

  SetAPI() {

    this.router.get("/", function(req, res) {
      res.sendfile('./adminUI/index.html', function(err) {
        if (err) res.send(404);
      });
      // res.end(JSON.stringify({success:true , data:result}));
    });
    this.router.get("/:page", function(req, res) {
      res.sendfile('./adminUI/' + req.params.page + '.html', function(err) {
        if (err) res.send(404);
      });
      // res.end(JSON.stringify({success:true , data:result}));
    });
    this.router.get("/api/productCatagory", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new sql("SELECT * FROM `category`")).ReturnJson(callback);
      // res.end(JSON.stringify({success:true , data:result}));
    });
    this.router.get("/api/productSupplier", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new sql("SELECT DISTINCT Supplier FROM `product`")).ReturnJson(callback);
      // res.end(JSON.stringify({success:true , data:result}));
    });

    // this.router.get("/api/productIndex", function(req, res) {
    //   var callback = function(msg) {
    //     res.send(msg);
    //   };
    //   (new sql("SELECT * FROM `product`")).ReturnJson(callback);
    //   // res.end(JSON.stringify({success:true , data:result}));
    // });
    this.router.post("/api/productSearch", function(req, res) {
      //console.log(req.body);
      var callback = function(msg) {
        res.send(msg);
      };

      var sqlPID = (req.body.PID == '') ? "" : " `PID` = '" + req.body.PID + "'" + " AND ";
      var sqlName = " `Product_Name` LIKE '%" + req.body.Name + "%'";
      var sqlPrice = (req.body.Price_low == '') ? "" : " AND " + " `Price` BETWEEN " + req.body.Price_low + " AND " + req.body.Price_up;
      var sqlSupplier = " AND " + " `Supplier` LIKE '%" + req.body.Supplier + "%'";
      var sqlCategory = (req.body.Category == '') ? "" : " AND " + " `Category` ='" + req.body.Category + "'";
      var sqlStr = "SELECT *  FROM `product` WHERE" + sqlPID + sqlName + sqlPrice + sqlSupplier + sqlCategory;
      console.log(sqlStr);
      (new sql(sqlStr)).ReturnJson(callback);
    });
  };


}