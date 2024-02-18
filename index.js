const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;
const mongodb = require("./DB.js");
mongodb();

const videosRoutes = require("./Routes/videoRoutes.js");
const userRoutes = require("./Routes/userRoutes.js");
const cors = require('cors');


app.use(cookieParser())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hamza The Great");
});

app.use(express.json());
app.use('/users', userRoutes); // Use a prefix for user routes
app.use('/videos', videosRoutes); // Use a prefix for video routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});