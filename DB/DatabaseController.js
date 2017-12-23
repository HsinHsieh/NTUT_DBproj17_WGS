'use strict';

const mysql = require('mysql');

var connection = mysql.createConnection({
  host: '35.185.151.213',
  user: 'admin',
  password: '2017wgs',
  database: 'wgs'
});


exports.GetDB = function() {
  exports.ExecuteSQLCommandWithoutLog("WGS DB" + connection.host);
  return connection;
}

exports.ExecuteSQLCommand = function(command) {
  connection.query(command, function(err, result) {
    if (err)
      console.log(err);
    else
      console.log(result);
  });
}

exports.ExecuteSQLCommandWithoutLog = function(command) {
  connection.query(command, function(err, result) {

  });
}

exports.callback = function(err, result) {
  if (err)
    console.log(err);
  else
    console.log(result);
}