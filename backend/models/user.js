const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../DBinstance");

const User = sequelize.define("User", {
    id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        autoIncrement : true
    },
    pseudo : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    admin : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
        allowNull : false
    }
},{
    timestamps : false
});

module.exports = sequelize.models.User;