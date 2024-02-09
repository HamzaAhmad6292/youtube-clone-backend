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
            catch(error){
                res.status(500).json({ message: "Error saving video to database", error: error });
            }
   
        }
     catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error: error });
    }
},



router.get("/getVideos",async(req,res)=>{

    try{
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;

    const skip = (page - 1) * pageSize;

    const [videos, totalVideos] = await Promise.all([
        Video.find().skip(skip).limit(pageSize).exec(),
        Video.countDocuments() // Get the total count of documents in the Video collection
    ]);
    const fetchedVideos=videos.length

    res.json({
        videos,
        page,
        pageSize,
        totalVideos,
        fetchedVideos
    });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });

    }
})



)

module.exports=router