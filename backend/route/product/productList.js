const DB = require("../../model/product.model");
const express = require("express");
const ListRouter = express.Router();


ListRouter.get('/addproduct', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});


ListRouter.get('/products', async (req, res) => {
    try {
        const products = await DB.Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

ListRouter.get('/products/:_id', async (req, res) => {
    try {
        const products = await DB.Product.findById(req.params._id);
        if(!products)
        {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


ListRouter.get('/sizes', async (req, res) => {
    try {
        const sizes = await DB.Size.find();
        res.status(200).json(sizes);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


ListRouter.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


ListRouter.get('/customers', async (req, res) => {
    try {
        const customers = await DB.Customer.find();
        res.status(200).json(customers);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});
ListRouter.get('/category', async (req, res) => {
    try {
        const customers = await DB.Category.find();
        res.status(200).json(customers);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});
ListRouter.get('/color', async (req, res) => {
    try {
        const customers = await DB.Color.find();
        res.status(200).json(customers);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});
module.exports = ListRouter;
