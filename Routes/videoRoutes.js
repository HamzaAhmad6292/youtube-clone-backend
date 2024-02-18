const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const upload=require("../utils/uploadUtils")
const Video=require("../Models/videoModel");
const User = require('../Models/User');
const verifyToken=require("../middlewares/verifyToken")

router.post("/uploadvideo",verifyToken,
videoController.uploadVideo
)

router.get("/getVideos", 
   videoController.getVideos
);

router.post("likeVideo/:id/")


module.exports=router