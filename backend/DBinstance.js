const {sequelize, Sequelize} = require("sequelize");
const secrets = require("./secrets");

const DBinstance = new Sequelize("merlinlibraryDB", "merlinlibrary", secrets.dbpassword, {dialect : "mysql", host : "localhost"});

module.exports = DBinstance;