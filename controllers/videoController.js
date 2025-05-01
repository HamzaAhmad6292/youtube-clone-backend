// Import required modules
const upload = require("../utils/uploadUtils");
const Video = require("../Models/videoModel");
const Comment = require("../Models/commentModel");
const User = require("../Models/User");

// Controller function to handle video upload
const uploadVideo = async (req, res, next) => {
    try {
        const { title, description, tags, thumbnailUrl, uploader, videoUrl, videoLength } = req.body;

        const newVideo = new Video({
            title,
            description,
            tags,
            videoUrl,
            thumbnailUrl,
            uploader,
            videoLength,
        });
        console.log(newVideo)

        try {
            const savedVideo = await newVideo.save()
            const user = await User.findById(uploader?._id)
            if (user) {
                user.videos.push(savedVideo)
                await user.save()
                res.status(201).json(savedVideo);
                console.log("video saved successfully")
            }
            else {

            }
        }
        catch (error) {
            res.status(500).json({ message: "Error saving video to database", error: error });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
};





const getVideos = async (req, res) => {
    try {
        console.log("---- RUN getVideos function")
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const filter = req.query.filter || null;
        const skip = (page - 1) * pageSize;

        let query = {};
        let sortOptions = {};
        sortOptions = { views: -1 };

        if (filter) {
            query.title = { $regex: filter, $options: "i" };
        }

        let videos = [];
        let hasNextPage = false;

        for (let i = 1; i <= page; i++) {
            const partialVideos = await Video.find(query)
                .skip((i - 1) * pageSize)
                .limit(pageSize)
                .sort(sortOptions)
                .exec();

            videos = videos.concat(partialVideos);
        }

        const totalVideos = await Video.countDocuments();
        const fetchedVideos = videos.length;

        if ((page * pageSize) < totalVideos) {
            hasNextPage = true;
        }

        res.json({
            videos,
            page,
            pageSize,
            totalVideos,
            fetchedVideos,
            hasNextPage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const likeVideo = async (req, res) => {
    try {
        const id = req.param.id
        const video = Video.findById(id)
        video.likes++
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }

}
const disLikeVideo = async (req, res) => {
    try {
        const id = req.param.id
        const video = Video.findById(id)
        video.dislikes++
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }

}

const addView = async (req, res) => {
    try {
        const id = req.param.id
        const video = Video.findById(id)
        video.views++
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

const addComment = async (req, res) => {
    try {
        const videoId = req.param.id
        const text = req.body.text
        const userId = req.user.id

        const video = Video.findById(videoId)
        const user = User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        const comment = await new Comment({
            text: text,
            user: user.name,
            Video: video._id,
        })
        video.comments.push(comment._id)
        await comment.save();
        res.json({ message: "Comment added successfully", comment: newComment });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });

    }
}
const getComments = async (res, req) => {
    try {
        const videoId = req.param.id
        const video = Video.findById(videoId).populate('comments')
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.json(video.comments)
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

const getVideobyId = async (res, req) => {
    try {
        const id = req.param.id
        const video = Video.findById(id)
        res.json({
            video
        })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

// Export the controller function
module.exports = {
    uploadVideo,
    getVideos,
    likeVideo,
    disLikeVideo,
    addView,
    addComment,
    getComments,
    getVideobyId,
};

