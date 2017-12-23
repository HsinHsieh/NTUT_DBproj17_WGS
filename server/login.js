const DataBaseController = require('../DB/DatabaseController.js')

// const mysql = require('mysql');
var express = require('express');
var crypto = require('crypto');
// var Passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser')
var session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var cookieParser = require('cookie-parser');

var member = require('./member.js');

module.exports = class {
    constructor(app, router) {
        this.app = app;
        this.router = router;
        this.db = DataBaseController.GetDB();
        this.SetAPI();
        this.SetSession();
    }

    SetSession() {
        this.app.use(session({
            key: 'wgs',
            secret: '948794ni',
            store: new MySQLStore({}, this.db),
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 24 * 6 * 600 * 1000,
            } //一天到期
        }));
    }

    SetAPI() {
        // this.router.post(
        //     '/',
        //     Passport.authenticate('local', {session: true}),function(req, res) {
        //         res.send('User' + req.user.acc.toString());
        // });

        this.router.post("/", function(req, res) {
            if (req.session.session_id) {
                res.send("你已經登入");
            } else {
                var User = new member();
                User.GetMemberFromAccount(req.body.account, function(err, results) {
                    if (results == null) {
                        res.locals.error = '使用者不存在';
                        res.send('使用者不存在');
                        return;
                    }
                    if (results.CID != req.body.account || results.Password != req.body.password) {
                        res.locals.error = '密碼錯誤';
                        res.send('密碼錯誤');
                        return;
                    } else {
                        res.locals.username = req.body.account;
                        //設定session
                        req.session.session_id = res.locals.username;
                        console.log(req.session.session_id);
                        //res.redirect('/');
                        res.send("登入成功");
                        return;
                    }
                });
            }
        });

        this.router.get("/IsLogined", function(req, res) {
            if (req.session.session_id) res.send(req.session.session_id);
            else res.send('false');
        });
    }
}