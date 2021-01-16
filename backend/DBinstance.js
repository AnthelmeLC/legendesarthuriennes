const {sequelize, Sequelize} = require("sequelize");

const DBinstance = new Sequelize("merlinlibraryDB", "merlinlibrary", "cBRer5w9yQr3HLui9", {dialect : "mysql", host : "localhost"});

module.exports = DBinstance;