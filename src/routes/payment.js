const express = require("express");
const { userAuth } = require("../middlewares/auth");
const instance = require("../config.js/razorpay");
const paymentRouter = express.Router();
const membershipType = require("../costants");
const Payment = require("../models/Payment");

paymentRouter.post("/payment/create",userAuth,async(req,res) => {
    try {
        const {membershipType} = req.body;
        const {firstName,lastName,email} = req.user;

        const order = await instance.orders.create({
            amount : membershipType[membershipType],
            currency : "INR",
            receipt : "receipt#1",
            notes : {
                firstName,
                lastName,
                email,
                membershipType
            }
        });
        const Payment = new Payment({
            userId : req.user._id,
            orderId : order.id,
            status : order.status,
            amount : order.amount,
            currency : order.currency,
            receipt : order.receipt,
            notes : order.notes
        })

        const savedPayment = await Payment.save();

        res.json({...savedPayment.toJSON()},process.env.RAZORPAY_KEYID)
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
})

module.exports = paymentRouter;