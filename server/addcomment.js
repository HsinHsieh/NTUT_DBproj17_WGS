const ProductDetail = require('./productDetail_db.js');

module.exports = class {

  constructor(router) {
    this.router = router;
    this.SetAPI();
  }

  SetAPI() {
    this.router.get("/", function(req, res) {
      res.sendfile('./UI/addcomment.html', function(err) {
        if (err) res.send(404);
      });
    });

    this.router.get("/:id", function(req, res) {
        var callback = function(msg) {
            res.send(msg);
        };
        (new ProductDetail(req.params.id)).GetProductInfo(callback);
    });

    this.router.get("/Comment/:id", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new ProductDetail(req.params.id)).GetCommentInfo(callback);
    });
  }
}
