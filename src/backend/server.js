const data = require("./data.js")
const express = require("express")
const app = express();
const config = require("./config")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const bodyparser = require("body-parser")
const productRouter = require("./routes/productRoutes")
const Product = require("./model/productModel")
dotenv.config();

const mongodbUrl = "mongodb+srv://ducmpham17:Phamminhduc1@cluster0-misdy.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true
}).catch(error => console.log(console.error()
));
app.use(bodyparser.json())
app.use("/api/users",userRoutes)
app.use("/api/products",productRouter)

app.get("/api/product/:id", async (req,res) => {
    const productId = req.params.id;
    console.log(productId)
    const product  = await Product.findById(productId)
    console.log(product)
    if(product){
        return res.send(product)
    }
    else{
        return res.send("error")
    }

})

app.get("/",(req,res) => {
    res.send("this is port 5000")
})

app.listen(5000, () => {
    console.log("server started at port 5000")
}) 