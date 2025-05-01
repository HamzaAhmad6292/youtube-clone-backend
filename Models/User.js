const mongoose = require("mongoose");
const Video = require("./videoModel");

const { Schema } = mongoose;

const User_Schema = new Schema({
name: {
    type: String,
    required: true
},
location : {
    type: String,
     required: false
},
email: {
    type: String,
    required: true
},
password : {
    type: String,
    required: true
},
date : {
    type: Date,
    default: Date.now()
},
videos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video'
}]


})

module.exports = mongoose.model("User", User_Schema)