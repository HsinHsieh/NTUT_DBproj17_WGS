const Product = require('./product')

module.exports = class {
    constructor(router) {
        this.router = router;
        this.products = [];
        this.productsInfo = [];
        this.SetAPI();
    }

    SetAPI() {
        this.router.put("/add", function(req, res) {
            var id = req.body.id;
            var quantity = req.body.quantity;
            var product = Product(id, quantity)
            products_Id.append(product);
            this.putProiductInfo()
            res.send('Product is added to shopping cart');
        });

        this.router.get("/get", function(req, res) {
            res.send(function() {
                var result = "<tr><th></th><th>Product name</th> <th>Description</th><th>Price</th><th>Quantity</th><th>Total Price</th><th></th></tr>"
                for (var i = 0; i < this.productsInfo.length; i++) {
                    var p = this.products[i];
                    var pic = "<td><img src='"+ p.pic_url +"' alt='13'></td>";
                    var name = "<td>"+ p.name + "</td>";
                    var descript = "<td>" + p.description + "</td>";
                    var price = "<td><strong>$" + p.price.toString() + "</strong></td>";
                    var quantity = "<td><input type='number' name='quantity' min='1' max='500' value='" + p.quantity.toString() + "'></td>";
                    var total = "<td><strong>$" + p.total.toString() + "</strong></td>"
                    result += pic + name + descript + price + quantity + total
                }
                return result;
            });
        });
    }

    putProductInfo() {
        var index = this.products.length-1;
        var p = this.products[index]
        var result = {
            'pic_url':p.pic_url,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'quantity': p.quantity,
            'total': p.total,
        };
        this.productsInfo.append(result);
    }

}
