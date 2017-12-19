const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(sqlStr) {
        this.db = DataBaseController.GetDB();
        this.data = null;
    }

    GetMemberFromAccount(account, callback) {
        this.db.query(
            "SELECT * FROM member WHERE CID = '" + account + "';",
            function(err, result, fields) {
                //console.log(result[0]);
                callback(err, result[0]);
            });
    }
}