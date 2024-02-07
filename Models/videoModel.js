// models/Video.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [String],
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  videoLength:{
    type:Number,
    required:true
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
