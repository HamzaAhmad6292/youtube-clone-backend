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
app.use('/users', userRoutes); 
app.use('/videos', videosRoutes); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
