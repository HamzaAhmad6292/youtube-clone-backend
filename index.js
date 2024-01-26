const express = require("express");
const app = express();
const port = 3000;
const mongodb = require("./DB.js")
mongodb()

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"http://localhost:3000" ),
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})
app.get("/", (req, res) => {
    res.send("Hamza The Great")
})
app.use(express.json())
app.use('/api', require("./Routes/Create_user"))
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)

})