const DataBaseController = require('../DB/DataBaseController.js')

module.exports = class {
    constructor(id, quantity) {
        this.pic_url = "";
        this.name = "";
        this.price = 0;
        this.description = "";
        this.total = 0;

        this.db = DataBaseController.GetDB();
        this.id = id;
        this.quantity = quantity;
        this.query();
        this.total = this.quantity * this.price;
    }

    query() {
        command = "SELECT * FROM `product` WHERE `PID`='" + this.id + "'";
        this.db.query(command, function(error, rows, fields) {
            if (error)
                throw error;
            var data = rows[0];
            this.name = data.Product_Name;
            this.price = data.Price;
            this.Product_Description = data.Product_Description;
        });
    }
}