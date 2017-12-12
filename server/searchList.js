const path = require('path');
const url = require('url');

const ItemList = require('./searchList_item.js');

module.exports = class {

    constructor(router) {
        this.router = router;
        // this.productManager = new ProductManager();
        this.SetAPI();
    }

    SetAPI() {

        this.router.get("/", function(req, res) {
            res.sendfile('./UI/SearchList.html', function(err) {
                if (err) res.send(404);
            });
            // res.end(JSON.stringify({success:true , data:result}));
        });

        this.router.get("/Searching", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new ItemList()).AddItems(callback);
        });
    }
}