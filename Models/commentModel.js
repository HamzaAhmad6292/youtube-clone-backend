const mongoose=require("mongoose")
const Schema=mongoose.Schema

const commentModel=new Schema({
    text:String,
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    Vidoe:{type:Schema.Types.ObjectId,ref:"Video"}

})

const Comment=new mongoose.Model("Comment",commentModel)

module.exports=Comment