const mongoose = require("mongoose");

const mongodb = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.yahpt3k.mongodb.net/Youtube?retryWrites=true&w=majority"
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     });
     
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongodb;
