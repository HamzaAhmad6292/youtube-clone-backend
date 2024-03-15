const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const upload=require("../utils/uploadUtils")
const Video=require("../Models/videoModel");
const User = require('../Models/User');
const verifyToken=require("../middlewares/verifyToken")

router.post("/uploadvideo",
videoController.uploadVideo
)

router.get("/getVideos", 
   videoController.getVideos
);

router.post(":id/like/",verifyToken,
videoController.likeVideo
);

router.post(":id/dislike",verifyToken,
videoController.disLikeVideo
);

router.post(":id/addView",verifyToken,
videoController.disLikeVideo
);

router.get(":id/comments",verifyToken,
videoController.getComments
);

router.post(":id/postComment",verifyToken,
videoController.addComment
);


module.exports=router