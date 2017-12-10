const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
//route
const Index = require('./server/index.js');
const Product = require('./server/productDetail.js')
const Admin = require('./server/admin.js')

var app = express();

var adminRouter = express.Router();
var indexRouter = express.Router();
var productRouter = express.Router();
var loginRouter = express.Router();
var shoppingCartRouter = express.Router();
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/admin', express.static('adminUI'));
app.use('/', express.static('UI'))
new Index(indexRouter);
app.use('/', indexRouter);
new Admin(adminRouter);
app.use('/admin', adminRouter);
//new Product(productRouter);
app.use('/product', productRouter);
var server = app.listen(3000, function() {
  console.log('Listening on port 3000');
});