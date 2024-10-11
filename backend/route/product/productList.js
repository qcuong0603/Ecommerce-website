const {Product}=require("../../Models/product.model");
const express = require("express");
const ListRouter = express.Router();
ListRouter.get('/addproduct',async (req,res)=>{
    const product = new Product({
        id:req.body.id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})
ListRouter.get('/products',async(req,res)=>{
    try {
        const product = await Product.find();
        res.status(200).json(product);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
})
module.exports = ListRouter;