const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
        enum: [
            "connectionRequest",
            "connectionAccepted",
            "message",
            "projectInvite",
            "projectJoinRequest",
            "like",
            "comment",
            "system"
        ]
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    // Optional reference to the related entity (chatId, projectId, videoId, etc.)
    relatedEntity: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "relatedModel"
    },
    relatedModel: {
        type: String,
        enum: ["Chat", "ConnectionRequest", "Video", "User", null]
    },
    isRead: {
        type: Boolean,
        default: false,
        index: true
    }
}, { timestamps: true });

// Compound index for efficient queries: unread notifications for a user, sorted by time
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
