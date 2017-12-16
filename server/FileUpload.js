 var multer = require('multer');

 var storage = multer.diskStorage({
   destination: function(req, file, cb) {
     cb(null, './UI/product_pic')
   },
   filename: function(req, file, cb) {;
     cb(null, "temp");
   }
 });
 var upload = multer({
   storage: storage
 });
 module.exports = upload;