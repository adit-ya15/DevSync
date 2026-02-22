const express = require("express");
const bcrypt = require("bcryptjs");
const {validateSignup} = require("../utils/validate");
const User = require("../models/user");
const validator = require("validator");



const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

    try {
        validateSignup(req);

        //encrypting the password
        const { firstName, lastName, age, gender, email, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            age,
            gender,
            email,
            password: passwordHash
        })


        await user.save()
        res.send("User saved successfully")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPass = await user.validateUser(password);

        if (!isValidPass) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = await user.getJWT();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

authRouter.post("/logout",(req,res) => {
    res.cookie("token","",{
        expires: new Date(0)
    })

    res.send("Logut Successfully")
})

module.exports = authRouter;