const DataBaseController = require('../DB/DatabaseController.js')

module.exports = class {
    constructor(sqlStr) {
        this.db = DataBaseController.GetDB();
        this.data = null;
    }

    GetMemberFromAccount(account, callback) {
        this.db.query(
            "SELECT * FROM member WHERE CID = '" + account + "';",
            function(err, result, fields) {
                //console.log(result[0]);
                callback(err, result[0]);
            });
    }

    IsAdminMember(account, callback) {
        this.db.query(
            "SELECT * FROM member WHERE CID = '" + account + "' AND Type = 2;",
            function(err, result, fields) {
                //console.log(result[0]);
                callback(err, result[0]);
            });
    }

    MemberRegister(RegisterData, callback) {
        var command = "INSERT INTO `member` (`CID`, `Password`, `Type`, `First_Name`, `Last_Name`,`Phone`, `Gender`) VALUES ('" + RegisterData.CID + "','" + RegisterData.Password +
            "','1','" + RegisterData.First_Name + "','" + RegisterData.Last_Name + "','" + RegisterData.Phone + "','" + RegisterData.Gender + "')";
        //console.log(command);
        this.db.query(
            command,
            function(err, result, fields) {
                //console.log(result[0]);
                callback(err, result);
            });
    }

    MemberModify(Data, callback) {
        var command = "UPDATE `member` SET `First_Name` = '" + Data.First_Name + "', `Last_Name` = '" + Data.Last_Name +
            "', `Email` = '" + Data.Email + "', `Phone` = '" + Data.Phone + "', `Gender` = '" + Data.Gender + "', `Address` = '" + Data.Adress +
            "', `Birthday` = '" + Data.Birthday + "' WHERE `member`.`CID` = '" + Data.CID + "';";
        //console.log(command);
        this.db.query(
            command,
            function(err, result, fields) {
                //console.log(result[0]);
                callback(err, result);
            });
    }

    MemberPswModify(Data, callback) {
        var command = "UPDATE `member` SET `Password` = '" + Data.Password + "' WHERE `member`.`CID` = '" + Data.CID + "';";
        //console.log(command);
        this.db.query(
            command,
            function(err, result, fields) {
                //console.log(result[0]);
                callback(err, result);
            });
    }
}