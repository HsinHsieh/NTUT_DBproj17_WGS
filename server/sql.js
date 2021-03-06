const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
  constructor(sqlStr) {
    this.db = DataBaseController.GetDB();
    this.data = null;
    this.sqlStr = sqlStr;
  }
  ReturnJson(callback) {
    this.db.query(this.sqlStr, function(error, rows, fields) {
      if (error)
        callback(JSON.stringify(error));
      callback(JSON.stringify(rows));
    })
  }
}