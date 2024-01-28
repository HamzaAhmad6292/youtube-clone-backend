const express = require('express');
const router = express.Router();
const videoController = require('../controllers/uploadVideoController');
const upload=require("../utils/uploadUtils")
const Video=require("../Models/videoModel")


router.post("/uploadvideo",
async (req, res, next) => {
    try {
        upload.single('video')(req, res, function (err) {
            console.log(err)
            if (err) {
                return res.status(400).json({ message: "Error uploading file", error: err });
            }

            // If file upload is successful, proceed with saving video details to the database
            const { title, description, tags, thumbnailUrl, uploader } = req.body;

            // Create a new video instance
            const newVideo = new Video({
                title,
                description,
                tags,
                videoUrl: "1", // Use req.file.path to get the uploaded file path
                thumbnailUrl,
                uploader
            });

            // Save the video to the database
            newVideo.save()
                .then(savedVideo => {
                    res.status(201).json(savedVideo);
                })
                .catch(error => {
                    res.status(500).json({ message: "Error saving video to database", error: error });
                });
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error: error });
    }
}



)

module.exports=router