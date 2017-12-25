var keygen = require("keygenerator");
const ProductKeys = require('./productKeys_db.js');
const DataBaseController = require('../DB/DatabaseController.js')

function generateKey(){
  var key = keygen._({
      forceUppercase: true,
      length: 15
  });
  var output = [key.slice(0, 5), key.slice(5, 10), key.slice(10, 15), key.slice(15, 20)].join('-');
  return output;
}

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

        this.router.post("/reveal", function(req, res) {
            var ocid = req.body.ocid;
            var output = generateKey();
            var db = DataBaseController.GetDB();

            var post_command = "UPDATE `order_content` SET `License_Key`='" + output + "', `Key_Used`= 1 WHERE `OCID`='" + ocid + "'"
            db.query(post_command, function(error, rows, fields) {
                if (error)
                    throw error
            });

            var get_command = "SELECT `License_Key` FROM `order_content` WHERE `OCID`='" + ocid + "' AND `Key_Used`= 1";
            db.query(get_command, function(error, rows, fields) {
                if (error)
                    throw error
                res.send(rows[0].License_Key);
            });
        });
    }
}
