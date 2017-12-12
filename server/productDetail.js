const path = require('path');
const url = require('url');

const ProductDetail = require('./productDetail_db.js');

module.exports = class {
    constructor(router) {
        this.router = router
        this.SetAPI()
    }
    SetAPI() {
        this.router.get("/", function(req, res) {
            res.sendfile('./UI/productDetail.html', function(err) {
                if (err) res.send(404);
            });
        });

        this.router.get("/category", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new ProductDetail()).GetProductCategory(callback);
        })

        this.router.get("/name", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new ProductDetail()).GetProductName(callback);
        })
    }

    TestAPI(id) {
        this.router.get("/" + id, function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new ProductDetail()).GetProductInfo(callback);
        })
    }
}
