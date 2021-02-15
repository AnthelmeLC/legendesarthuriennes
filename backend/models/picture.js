const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../DBinstance");

const Picture = sequelize.define("picture", {
    id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        autoIncrement : true
    },
    storyId : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    url : {
        type : DataTypes.STRING,
        allowNull : false
    },
    illustrator : {
        type : DataTypes.STRING,
        allowNull : false
    },
    caption : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    timestamps : false
});

module.exports = sequelize.models.picture;