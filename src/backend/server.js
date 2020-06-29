const data = require("./data.js")
const express = require("express")
const app = express();
const config = require("./config")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
dotenv.config();

const mongodbUrl = "mongodb+srv://ducmpham17:Phamminhduc1@cluster0-misdy.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true
}).catch(error => console.log(console.error()
));

app.use("/api/users",userRoutes)

app.get("/api/product", (req, res) => {
    res.send(data)
})

app.get("/api/product/:id", (req, res) => {
    const id = req.params.id;
    console.log(data.data[id])
    res.send(data.data[id])
})

app.get("/",(req,res) => {
    res.send("this is port 5000")
})

app.listen(5000, () => {
    console.log("server started at port 5000")
}) 