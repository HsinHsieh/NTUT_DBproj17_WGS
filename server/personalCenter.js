const Order = require('./Order.js');

module.exports = class {

    constructor(router) {
        this.router = router;
        this.SetAPI();
    }

    SetAPI() {
        this.router.get("/", function(req, res) {
            res.sendfile('./UI/personalCenter.html', function(err) {
                if (err) res.send(404);
            });
        });

        this.router.get("/GetOrderMains", function(req, res) {
            var callback = function(err, msg) {
                if (err) res.send(404);
                res.send(msg);
            };
            (new Order()).GetOrderMain(req.session.session_id, callback);
        });

        this.router.get("/GetOrderContents/:OID", function(req, res) {
            var callback = function(err, msg) {
                if (err) res.send(404);
                res.send(msg);
            };
            (new Order()).GetOrderContents(req.params.OID, callback);
        });
    }
}