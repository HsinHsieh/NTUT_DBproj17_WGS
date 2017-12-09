const express = require('express');
const http = require('http');
//route
const Index = require('./server/index.js');
const Product = require('./server/productDetail.js');
const Admin = require('./server/admin.js');

var app = express();
var adminRouter = express.Router();
var indexRouter = express.Router();
var productRouter = express.Router();
var loginRouter = express.Router();
var shoppingCartRouter = express.Router();

new Index(indexRouter);
app.use('/', indexRouter);

new Product(productRouter);
app.use('/product', productRouter);

new Admin(adminRouter);
app.use('/admin', adminRouter);
var server = app.listen(3000, function() {
  console.log('Listening on port 3000');
});