const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:String,
});

const User = mongoose.model("User",userSchema);


module.exports = User;