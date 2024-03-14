const mongoose=require("mongoose")
const Schema=mongoose.Schema

const commentModel=new Schema({
    text:String,
    User: String,
    Video:{type:Schema.Types.ObjectId,ref:"Video"}

})

const Comment=new mongoose.model("Comment",commentModel)

module.exports=Comment