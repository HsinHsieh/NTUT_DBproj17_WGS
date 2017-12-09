const express = require('express');
const http = require('http');


var app = express();


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
