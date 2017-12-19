var express = require('express');
var crypto = require('crypto');

var member = require('./member.js');

module.exports = class {
    constructor(router) {
        this.router = router;
        this.SetAPI();
    }

    SetAPI() {
        this.router.get("/", function(req, res) {
            res.sendfile('./UI/index.html', function(err) {
                if (err) res.send(404);
            });
        });
        this.router.post("/", function(req, res) {
            var User = new member();
            User.GetMemberFromAccount(req.body.account, function(err, results) {
                if (results == null) {
                    res.locals.error = '使用者不存在';
                    res.send('使用者不存在');
                    return;
                }
                if (results.CID != req.body.account || results.Password != req.body.password) {
                    res.locals.error = '使用者帳號或密碼錯誤';
                    res.send('使用者帳號或密碼錯誤');
                    return;
                } else {
                    res.locals.username = req.body.account;
                    //設定session
                    //req.session.username = res.locals.username;
                    //console.log(req.session.username);
                    //res.redirect('/');
                    res.send("登入成功");
                    return;
                }
            });
        });

    }
}