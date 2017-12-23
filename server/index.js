const ItemPreview = require('./index_itemPreview.js');
const CategoryItem = require('./index_categoryItem.js')

module.exports = class {

    constructor(router) {
        this.router = router;
        this.SetAPI();
    }

    SetAPI() {
        this.router.get("/", function(req, res) {
            res.sendfile('./UI/index.html', function(err) {
                if (err) res.send(404);
            });
            // res.end(JSON.stringify({success:true , data:result}));
        });

        this.router.get("/new_arrival", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
            };
            (new ItemPreview()).AddItemPreview(callback);
        });

        this.router.get("/categoryItem/:cate", function(req, res) {
            var callback = function(msg) {
                res.send(msg);
                //console.log(msg);
            };
            (new CategoryItem(req.params.cate)).AddItems(callback);
        });
    }
}