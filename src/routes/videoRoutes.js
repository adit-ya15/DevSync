const express = require("express")
const videoRouter = express.Router();

const videoController = require("../controllers/videoController")
const { userAuth } = require("../middlewares/auth")
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});


videoRouter.post("/upload", userAuth, upload.single("video"), videoController.uploadVideo);

videoRouter.delete("/:id", userAuth, videoController.deleteVideo);

videoRouter.patch("/:id/view", videoController.addView);

videoRouter.post("/like", videoController.toggleLike);

videoRouter.post("/comment", videoController.addComment);

videoRouter.get("/feed", videoController.getFeed);

module.exports = videoRouter;