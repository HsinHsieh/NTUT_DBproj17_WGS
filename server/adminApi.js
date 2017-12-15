const sql = require('./sql.js');
module.exports = class {

  constructor(router) {
    this.router = router;
    // this.productManager = new ProductManager();
    this.SetAPI();
  }
  SetAPI() {
    this.router.get("/productCatagory", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new sql("SELECT * FROM `category`ORDER BY CAID ASC")).ReturnJson(callback);
      // res.end(JSON.stringify({success:true , data:result}));
    });
    this.router.get("/mainProductNum", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new sql("SELECT count(*) AS Pnum FROM product")).ReturnJson(callback);
    });
    this.router.get("/productSupplier", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new sql("SELECT DISTINCT Supplier FROM `product`ORDER BY Supplier ASC")).ReturnJson(callback);
    });
    this.router.post("/productSearch", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      var sqlPID = (req.body.PID == '') ? "" : " `PID` = '" + req.body.PID + "'" + " AND ";
      var sqlName = " `Product_Name` LIKE '%" + req.body.Name + "%'";
      var sqlPrice = (req.body.Price_low == '') ? "" : " AND " + " `Price` BETWEEN " + req.body.Price_low + " AND " + req.body.Price_up;
      var sqlSupplier = " AND " + " `Supplier` LIKE '%" + req.body.Supplier + "%'";
      var sqlCategory = (req.body.Category == '') ? "" : " AND " + " `Category` ='" + req.body.Category + "'";
      var sqlOrder = " ORDER BY RIGHT(`PID`,7) DESC";
      var sqlStr = "SELECT *  FROM `product` WHERE" + sqlPID + sqlName + sqlPrice + sqlSupplier + sqlCategory + sqlOrder;
      (new sql(sqlStr)).ReturnJson(callback);
    });
    this.router.post("/productAdd", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      //console.log(sqlStr);
      var Str = "INSERT INTO `product` (`PID`, `Product_Name`, `Price`, `Product_Description`, `System_Requirement`, `Supplier`, `Launch_Date`, `Category`, `Modified_Time`, `Pic_Url`) VALUES ('" + req.body.PID + "','" + req.body.Name + "','" + req.body.Price + "','" + req.body.Description + "','" + req.body.Requirement + "','" + req.body.Supplier + "','" + req.body.Date;
      var Str2 = "','" + req.body.Category + "',CURRENT_TIMESTAMP, '')";

      (new sql(Str + Str2)).ReturnJson(callback);
    });
    this.router.get("/productMaxID", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      (new sql("SELECT MAX(RIGHT(`product`.`PID`,7))+1 AS 'NUM' FROM `product`")).ReturnJson(callback);
    });
    this.router.get("/productEdit/:PID", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      var sqlStr = "SELECT DISTINCT * FROM `product` WHERE `product`.`PID`='" + req.params.PID + "'";
      console.log(sqlStr);
      (new sql(sqlStr)).ReturnJson(callback);
    });
    this.router.post("/categoryAdd", function(req, res) {
      var callback = function(msg) {
        res.send(msg);
      };
      var Str = "INSERT INTO `category` (`CAID`, `Category_Name`) VALUES ('" + req.body.CAID + "', '" + req.body.Name + "')";
      (new sql(Str)).ReturnJson(callback);
    });



  }
}