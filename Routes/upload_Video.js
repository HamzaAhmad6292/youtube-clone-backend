const express = require('express');
const router = express.Router();
const videoController = require('../controllers/uploadVideoController');
const upload=require("../utils/uploadUtils")
const Video=require("../Models/videoModel");
const User = require('../Models/User');


router.post("/uploadvideo",
async (req, res, next) => {
    try {

            const { title, description, tags, thumbnailUrl, uploader,videoUrl,videoLength } = req.body;

            const newVideo = new Video({
                title,
                description,
                tags,
                videoUrl,
                thumbnailUrl,
                uploader,
                videoLength,
            });


            try{
            const savedVideo=await newVideo.save()
            const user= await User.findById(uploader?._id)
            if(user){
                user.videos.push(savedVideo)
                await user.save()
                res.status(201).json(savedVideo); 
            }
            }
            catch(error){0
                res.status(500).json({ message: "Error saving video to database", error: error });
            }


            
     


            res.status(201).json(savedVideo);


   
        }
     catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error: error });
    }
}



)

module.exports=router