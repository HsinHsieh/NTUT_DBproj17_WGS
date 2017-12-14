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

        this.router.get("/:target", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new ItemList(req.params.target)).AddItems(callback);
        });

        this.router.get("/GridSearching/:target", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new ItemList(req.params.target)).AddItemsInGrid(callback);
        });
    }
}
