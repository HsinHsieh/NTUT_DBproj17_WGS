const path = require('path');
const url = require('url');

const ItemPreview = require('./item_preview.js');

module.exports = class {

  constructor(router) {
    this.router = router;
    // this.productManager = new ProductManager();
    this.SetAPI();
  }

  SetAPI() {

    this.router.get("/", function(req, res) {
      res.sendfile('./UI/index.html', function(err) {
        if (err) res.send(404);
      });
      // res.end(JSON.stringify({success:true , data:result}));
    });

    this.router.get(/(.*)\.(jpg|gif|png|ico|woff|ttf|txt|html|css|js)/i, function(req, res) {
      res.sendfile("./UI" + req.params[0] + "." + req.params[1], function(err) {
        if (err) res.send(404);
      });
    });

    this.router.get("/new_arrival", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new ItemPreview()).AddItemPreview(callback);
    });


  }
}