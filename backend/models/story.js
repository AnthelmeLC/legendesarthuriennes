const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../DBinstance");

const Story = sequelize.define("Story", {
    id : {
        type : DataTypes.NUMBER,
        primaryKey : true,
        autoIncrement : true
    },
    userId : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    typeId : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    story : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    timestamps : false
});

module.exports = sequelize.models.Story;