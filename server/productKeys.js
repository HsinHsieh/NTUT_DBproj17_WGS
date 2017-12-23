const ProductKeys = require('./productKeys_db.js');

module.exports = class {
    constructor(router) {
        this.router = router;
        this.SetAPI();
    };

    SetAPI() {
        this.router.get("/", function(req, res) {
            res.sendfile('./UI/productKeys.html', function(err) {
                if (err) res.send(404);
            });
        });

        this.router.get("/:userid", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new ProductKeys(req.params.userid)).GetProductKeysInfo(callback);
        });
    }
}
