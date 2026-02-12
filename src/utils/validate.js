const validator = require("validator");

const validateSignup = (req) => {
    const {firstName, lastName, age, gender, email,password} = req.body

    if(!firstName || !lastName || !age || !gender || !email || !password){
        throw new Error("Please fill all the fields")
    }
    else if ( !validator.isEmail(email)){
        throw new Error("please enter a valid email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter the strong password")
    }
}

const validateProfileEditData = (req) => {
    const allowedFields = ["firstName", "lastName", "age", "gender"]

    let isAllowed = Object.keys(req.body).every((key) => allowedFields.includes(key));

    const {firstName,lastName,age,gender} = req.body;

    try {
        if(isAllowed){
            if(firstName || lastName){
                if(firstName.length() > 50){
                    isAllowed = false;
                    throw new Error("FirstName not be greater than 50 characters");
                }
                const isAlpha = validator.isAlpha(firstName);
                if(!isAlpha){
                    isAllowed = false;
                    throw new Error("FirstName should contain only letters")
                }
            }
            if(age){
                if(age < 0 || age > 100){
                    isAllowed = false;
                    throw new Error("Age should be lies between the range 1 - 100")
                }
            }
            if(gender){
                const allowedGender = ["male","female","ohter"];
                if(!allowedGender.includes(gender)){
                    isAllowed = false;
                    throw new Error("Gender should be male,female and other")
                }
            }
        }
        return isAllowed;
    } catch (error) {
        return error.message;
    }

}

module.exports = {validateSignup,validateProfileEditData};