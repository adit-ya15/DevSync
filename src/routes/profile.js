const express = require("express");
const {userAuth} = require("../middlewares/auth")
const {validateProfileEditData} = require("../utils/validate")

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

profileRouter.post("/profile/edit",userAuth,async(req,res) => {
    const isUpdateAllowed = validateProfileEditData(req);

    if(isUpdateAllowed === true){
        const loggesInUser = req.user;
        Object.keys(req.body).forEach((key) => loggesInUser[key] = req.body[key]);
        console.log(loggesInUser);
        await loggesInUser.save();
        res.send("User updated successfully");
    }
    else{
        res.status(400).send(isUpdateAllowed);
    }
})

module.exports = profileRouter;