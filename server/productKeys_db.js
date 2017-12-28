const DataBaseController = require('../DB/DatabaseController.js')

// function generateKey(){
//   var key = keygen._({
//       forceUppercase: true,
//       length: 20
//   });
//   var output = [key.slice(0, 5), key.slice(5, 10), key.slice(10, 15), key.slice(15, 20)].join('-');
//   return output;
// }

module.exports = class {
    constructor(userID) {
        this.id = userID;
        this.db = DataBaseController.GetDB();
    }

    GetProductKeysInfo(callback){
        var command = "SELECT `Order_Number`, `OCID`, `Product_Name`, DATE_FORMAT(Order_Time,'%Y-%m-%d %H:%i:%s') AS Formated_Order_Time, `License_Key`, `Key_Used` \
                       FROM (`order_content` \
                                JOIN `order_main` ON `order_content`.`Order_Number` = `order_main`.`OID`) \
                                JOIN `product` ON `order_content`.`Item` = `product`.`PID` \
                       WHERE `Order_Number` IN (SELECT `OID` \
                                                FROM `order_main` \
                                                WHERE `Customer` = '" + this.id + "' \
                                                AND `order_main`.`Status` = 1)";
        this.db.query(command, function(error, rows, fields) {
            if (error)
                throw error;
            callback(rows);
        });
    }
}
