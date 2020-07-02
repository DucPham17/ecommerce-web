const express = require("express")
const Product = require("../model/productModel.js")
const router = express.Router();
const  isAuth = require("../util.js").isAuth;
const isAdmin = require("../util.js").isAdmin;



router.get("/", async (req,res) => {
    const product = await Product.find({});
    res.send(product)
})

router.get("/:id", async (req,res) => {
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

router.post("/",async(req,res) => {
   // console.log(isAuth(req,res))
   if(isAuth && isAdmin ){
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
    })
    console.log(product)
    const newProduct = await product.save();
    if(newProduct){
       return res.status(201).send({message: "New Product Created", data: newProduct})
    }
    return res.status(500).send({message: "Error"})
}
else{
    return res.status(500).send({message: "Error"})
}
})

router.put("/:id",async(req,res) => {
    if(isAuth && isAdmin){
    const productId = req.params.id;
    const product = await Product.findById(productId)
    console.log(product)
    console.log(req.body.price)
    if(product){
        product.name = req.body.name;
        product.price  = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
    }
    const newProduct = await product.save();
    if(newProduct){
        return res.status(200).send({message: "Product Updated", data: newProduct})
    }
    else{
        return res.status(500).send({message: "Error"})
    }
}
    else{
        return res.status(500).send({message: "Error"})
    }
})

router.delete("/:id",async(req,res) => {
    if(isAuth && isAdmin){
    console.log("a")
    const productId = req.params.id;
    const deletedProduct = await Product.findById(productId)
    console.log(deletedProduct)
    if(deletedProduct){
        await deletedProduct.remove();
        return res.send({msg: "Product deleted"})
    }
    else{
        return res.send({msg: "There is an error in delete"})
    }
}
else{
    return res.send({msg: "There is an error in delete"})
}
})

module.exports = router;

