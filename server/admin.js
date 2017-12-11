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
    // this.router.get("/api/productCatagory", function(req, res) {
    //   var callback = function(msg) {
    //     res.send(msg);
    //   };
    //   (new sql("SELECT * FROM `category`ORDER BY CAID ASC")).ReturnJson(callback);
    //   // res.end(JSON.stringify({success:true , data:result}));
    // });
    // this.router.get("/api/productSupplier", function(req, res) {
    //   var callback = function(msg) {
    //     res.send(msg);
    //   };
    //   (new sql("SELECT DISTINCT Supplier FROM `product`ORDER BY Supplier ASC")).ReturnJson(callback);
    //   // res.end(JSON.stringify({success:true , data:result}));
    // });

    // this.router.get("/api/productIndex", function(req, res) {
    //   var callback = function(msg) {
    //     res.send(msg);
    //   };
    //   (new sql("SELECT * FROM `product`")).ReturnJson(callback);
    //   // res.end(JSON.stringify({success:true , data:result}));
    // });

  };


}