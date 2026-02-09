const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName :{ 
        type : String
    },
    lastName : {
        type : String
    },
    age : {
        type : Number
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","other"].includes(value.toLowerCase())){
                throw new Error("Please enter a valid gender")
            }
        }
    }
},{timestamps : true})

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id},"DevTinder@4648h");
    return token;
}

userSchema.methods.validateUser = async function(passwordInputByUser){
    const user = this;

    const isValid = await bcrypt.compare(passwordInputByUser,user.password);

    return isValid;
}

const User = mongoose.model("User",userSchema)

module.exports = User