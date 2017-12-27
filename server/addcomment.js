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
        var comment = {
           PID: req.params.id,
        }
        var callback = function(msg) {
            res.send(msg);
        };
        (new Comment(comment)).GetProduct(callback);
    });

    this.router.post("/submit/:pid", function(req, res) {
        var comment = {
           customer: req.session.session_id,
           PID: req.params.pid,
           text: req.body.comment,
           rating: req.body.rating
        }
        var callback = function(msg) {
            res.send(msg);
        };
        (new Comment(comment)).PostComment(callback);
    });
  }
}
