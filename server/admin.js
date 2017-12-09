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
      res.sendfile('./adminUI/index.html', function(err) {
        if (err) res.send(404);
      });
      // res.end(JSON.stringify({success:true , data:result}));
    });



  }
}