const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../DBinstance");

const StoryType = sequelize.define("storytype", {
    id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }
},{
    timestamps : false
});

module.exports = sequelize.models.storytype;