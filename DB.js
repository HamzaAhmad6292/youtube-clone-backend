const mongoose = require("mongoose");

const mongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hamzathegreat1234:hamzaahmed1234@youtubeclone.izouspz.mongodb.net/?retryWrites=true&w=majority&appName=youtubeClone",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MONGODB - Connected to MongoDB");
  } catch (error) {
    console.error("MONGODB - Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongodb;
