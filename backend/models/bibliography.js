const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../DBinstance");

const Bibliography = sequelize.define("bibliography", {
    id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        autoIncrement : true
    },
    userId : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    auther : {
        type : DataTypes.STRING,
        allowNull : false
    },
    translater : {
        type : DataTypes.STRING,
        allowNull : true
    },
    yearOfPublication : {
        type : DataTypes.STRING,
        allowNull : false
    },
    yearOfReissue : {
        type : DataTypes.STRING,
        allowNull : true
    },
    pictureUrl : {
        type : DataTypes.STRING,
        allowNull : true
    }
},{
    timestamps : false
});

module.exports = sequelize.models.bibliography;