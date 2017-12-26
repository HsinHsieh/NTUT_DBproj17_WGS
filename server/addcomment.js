const Comment = require('./addcomment_db.js')

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
        (new Comment(req.params.id)).GetProductName(callback);
    });

    this.router.post("/submitcomment", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new Comment(res.body.id)).GetCommentInfo(callback);
    });
  }
}
