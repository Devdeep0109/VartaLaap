const {Schema, model} = require("mongoose");

const userSchema = new Schema({

    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    confirmPassword:{
        type:String,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type: String,
        default:"",
    }
},{timestamps:true})

const User = model("user",userSchema);

module.exports = User;