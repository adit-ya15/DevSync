const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    status : {
        type : String,
        enum : {
            values : ["interested", "ignored", "accepted", "rejected"],
            message : `{VALUE} is not valid`
        }
    }
},{timestamps : true})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;