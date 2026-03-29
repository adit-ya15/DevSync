const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        trim: true
    },
    projectName: {
        type: String,
        trim: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);