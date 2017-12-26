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
        this.SetAPI(this.db);
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

    SetAPI(db) {
        this.router.get("/memberData", function(req, res) {
            var callback = function(err, msg) {
                if (err) res.send(404);
                res.send(msg);
            };
            (new member()).GetMemberFromAccount(req.session.session_id, callback);
        });

        this.router.post("/", function(req, res) {

            if (req.session.sessionAdmin_id) {
                res.send("Admin登入中\n請先登出Admin");
            } else if (req.session.session_id) {
                res.send("你已經登入!\n一台電腦中一個瀏覽器僅能有一個使用者");
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
                        req.session.session_id = req.body.account; //res.locals.username
                        //res.redirect('/');
                        res.send("登入成功");
                        return;
                    }
                });
            }
        });

        this.router.get('/', function(req, res) {
            //console.log(req.session.session_id + "++" + req.session.sessionAdmin_id);
            db.query("DELETE FROM `sessions` WHERE `data` LIKE '%" + req.session.session_id + "%' OR  `data` LIKE '%" + req.session.sessionAdmin_id + "%'");
            req.session.destroy();
            res.send('你已經登出惹 ㄅㄅ\n(將登出所有使用中的本帳戶)');
        });

        this.router.get("/IsLogined", function(req, res) {
            if (req.session.session_id) res.send(req.session.session_id);
            else res.send('false');
        });

        this.router.post("/ifMemberExist", function(req, res) {
            var User = new member();
            User.GetMemberFromAccount(req.body.email, function(err, results) {
                if (results == null) {
                    res.send("false")
                } else {
                    res.send("true");
                }
            });
        });

        this.router.post("/Register", function(req, res) {
            var User = new member();
            User.MemberRegister(req.body, function(err, results) {
                if (err) {
                    res.send("failed")
                } else {
                    res.send("successed");
                }
            });
        });

        this.router.post("/modifyData", function(req, res) {
            var User = new member();
            User.MemberModify(req.body, function(err, results) {
                if (err) {
                    res.send("failed")
                } else {
                    res.send("successed");
                }
            });
        });

        this.router.post("/modifyPsw", function(req, res) {
            var User = new member();
            User.MemberPswModify(req.body, function(err, results) {
                if (err) {
                    res.send("failed")
                } else {
                    res.send("successed");
                }
            });
        });


        this.router.post("/loginAdmin", function(req, res) {
            //解決admin 和 UI session衝突
            db.query("DELETE FROM `sessions` WHERE `data` LIKE '%" + req.session.session_id + "%' OR  `data` LIKE '%" + req.session.sessionAdmin_id + "%'");
            var User = new member();
            User.IsAdminMember(req.body.account, function(err, results) {
                if (results == null) {
                    res.locals.error = '管理員不存在';
                    res.send('管理員不存在 重新登入或滾');
                    return;
                }
                if (results.CID != req.body.account || results.Password != req.body.password) {
                    res.locals.error = '密碼錯誤';
                    res.send('密碼錯誤');
                    return;
                } else {
                    res.locals.username = req.body.account;
                    //設定session
                    req.session.sessionAdmin_id = req.body.account; //res.locals.username
                    //res.redirect('/');
                    res.send("管理員登入成功");
                    return;
                }
            })
        });

        this.router.get("/IsLoginedAdmin", function(req, res) {
            //console.log(req.session.sessionAdmin_id);
            if (req.session.sessionAdmin_id) res.send(req.session.sessionAdmin_id);
            else res.send('false');
        });
    }
}