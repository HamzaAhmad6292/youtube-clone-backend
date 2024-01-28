// Import required modules
const upload = require("../utils/uploadUtils");
const Video = require("../Models/videoModel");

// Controller function to handle video upload
const uploadVideo = async (req, res, next) => {
    try {
        // Handle file upload using multer middleware
        upload.single('video')(req, res, function (err) {
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
                videoUrl: req.file.path, // Use req.file.path to get the uploaded file path
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
        res.status(500).json({ message: "Internal server error", error: error });
    }
};

// Export the controller function
module.exports = {
    uploadVideo
};
