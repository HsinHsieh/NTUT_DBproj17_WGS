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

        this.router.get("/:pid", function(req, res) {
            var comment = {
               PID: req.params.pid,
            }
            var callback = function(msg) {
                res.send(msg);
            };
            (new Comment(comment)).GetProduct(callback);
        });

        this.router.post("/get", function(req, res) {
            var comment = {
               customer: req.session.session_id
            };
            var callback = function(msg) {
                res.send(msg);
            };
            (new Comment(comment)).GetCommentByCustomer(callback);
        });

        this.router.post("/get/:coid", function(req, res) {
            var comment = {
               COID: req.params.coid
            };
            var callback = function(msg) {
                res.send(msg);
            };
            (new Comment(comment)).GetCommentByCOID(callback);
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

        this.router.post("/edit/:coid", function(req, res) {
            var comment = {
               COID: req.params.coid,
               text: req.body.comment,
               rating: req.body.rating
            }
            var callback = function(msg) {
                res.send(msg);
            };
            (new Comment(comment)).EditComment(callback);
        });

        this.router.post("/delete/:coid", function(req, res) {
            var comment = {
               COID: req.params.pid
            }
            (new Comment(comment)).DeleteComment(callback);
        });
    }
}
