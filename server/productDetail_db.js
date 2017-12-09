const DataBaseController = require('../DB/DatabaseController.js')

const item_preview_template = "<span class='span1'>{{Category_Name}}遊戲</span><a href='#'><h4> {{Product_Name}} </h4></a>"

module.exports = class {
    constructor() {
        this.db = DataBaseController.GetDB();
        this.data = null;
    }

}
