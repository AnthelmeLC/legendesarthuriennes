const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    pseudo : {type : String, required : true, unique : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    moderator : {type : Boolean, required : true},
    admin : {type : Boolean, required : true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);