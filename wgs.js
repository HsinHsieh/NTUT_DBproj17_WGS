const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
//route file declare
const Index = require('./server/index.js');
const SearchList = require('./server/searchList.js')
const Product = require('./server/productDetail.js')
const Admin = require('./server/admin.js')
const AdminApi = require('./server/adminApi.js')

//main framwork declare
var app = express();

//router variable declare
var adminRouter = express.Router();
var adminApiRouter = express.Router();
var indexRouter = express.Router();
var productRouter = express.Router();
var loginRouter = express.Router();
var shoppingCartRouter = express.Router();
var searchListRouter = express.Router();

//body parser-for POST Info to transfer in http packet
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//static route-front and end
app.use('/admin', express.static('adminUI'));
app.use('/', express.static('UI'))

//router-sub directory separation
new Index(indexRouter);
app.use('/', indexRouter);

new SearchList(searchListRouter);
app.use('/search', searchListRouter);

new Admin(adminRouter);
app.use('/admin', adminRouter);

new AdminApi(adminApiRouter);
app.use('/admin/api', adminApiRouter);

new Product(productRouter);
app.use('/product', productRouter);

//main listening process
var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});
