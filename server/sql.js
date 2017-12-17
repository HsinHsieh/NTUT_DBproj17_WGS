const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
  constructor(sqlStr) {
    this.db = DataBaseController.GetDB();
    this.data = null;
    this.sqlStr = sqlStr;
    console.log((sqlStr));
  }
  ReturnJson(callback) {
    this.db.query(this.sqlStr, function(error, rows, fields) {
      if (error)
        throw error;
      callback(JSON.stringify(rows));
    })
  }
}