const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(userID) {
        this.id = userID;
        this.db = DataBaseController.GetDB();
    }

    GetProductKeysInfo(callback){
        var command = "SELECT `Order_Number`, `Product_Name`, `Order_Time`, `License_Key`, `Key_Used` FROM (`order_content` JOIN `order_main` ON `order_content`.`Order_Number` = `order_main`.`OID`) JOIN `product` ON `order_content`.`Item` = `product`.`PID` WHERE `Order_Number` IN (SELECT `OID` FROM `order_main` WHERE `Customer` = '" + this.id + "')";
        this.db.query(command, function(error, rows, fields) {
            if (error)
                throw error;
            console.log(rows)
            callback(rows);
        });
    }
}
