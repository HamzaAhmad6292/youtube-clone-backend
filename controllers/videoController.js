// Import required modules
const upload = require("../utils/uploadUtils");
const Video = require("../Models/videoModel");

// Controller function to handle video upload
const uploadVideo = async (req, res, next) => {
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

    }catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
};


const getVideos=async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 20;
        const filter=req.query.filter || null
        const skip = (page - 1) * pageSize;

        let query = {};
        let sortOptions = {};
        sortOptions = { views: -1 };


        if (filter) {
            query.title = { $regex: filter, $options: "i" }; // Case-insensitive search
        }



        
        
        const videos = await Video.find(query)
            .skip(skip)
            .limit(pageSize)
            .sort(sortOptions)
            .exec();


        const totalVideos = await Video.countDocuments();
        const fetchedVideos = videos.length;
        const hasNextPage = (page * pageSize) < totalVideos;

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
}


const likeVideo=async(req,res)=>{
    try{
    const id=req.param.id

    const video=Video.findById(id)

    video.likes++
    }
    catch(error){
        res.status(500).json({ message: "Internal server error", error: error });
    }
    
}
const disLikeVideo=async(req,res)=>{
    try{
    const id=req.param.id

    const video=Video.findById(id)

    video.dislikes++
    }
    catch(error){
        res.status(500).json({ message: "Internal server error", error: error });
    }
    
}

const addView=async(req,res)=>{
    try{
        const id=req.param.id

        const video=Video.findById(id)
    
        video.views++
    }
    catch(error){
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

// Export the controller function
module.exports = {
    uploadVideo,
    getVideos
};

