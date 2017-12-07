var express = require('express');
var mysql = require('mysql');

var app = express();

var connection = mysql.createConnection({
    host: '140.124.66.13',
    user: 'admin',
    password: '2017wgs',
    database: 'wgs'
});
// connection.connect();
//
// connection.query('SELECT * FROM `product`',function(error, rows, fields){
//     //檢查是否有錯誤
//     if(error){
//         throw error;
//     }
//     console.log(rows[0].PID); //2
// });

app.get("/", function(req, res) {
    res.sendfile('./UI/index.html', function(err) {
        if (err) res.send(404);
    });
});

app.get(/(.*)\.(jpg|gif|png|ico|woff|ttf|txt|html|css|js)/i, function(req, res) {
    res.sendfile("./UI" + req.params[0] + "." + req.params[1], function(err) {
        if (err) res.send(404);
    });
});
var server = app.listen(3000, function() {
  console.log('Listening on port 3000');
 });
