const express = require("express");
const app = express();
const port = 3001;
const mongodb = require("./DB.js");
mongodb();

const videosRoutes = require("./Routes/upload_Video.js");
const userRoutes = require("./Routes/Create_user");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "http://localhost:3001");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", (req, res) => {
    res.send("Hamza The Great");
});

app.use(express.json());
app.use('/users', userRoutes); // Use a prefix for user routes
app.use('/videos', videosRoutes); // Use a prefix for video routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
