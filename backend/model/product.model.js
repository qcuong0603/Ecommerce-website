const mongoose = require('mongoose');

const product = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    categoryID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }],
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    number: { type: Number, required: true },
    describe: { type: String, required: true },
    sizeID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true,
    }],
    mainImage: { type: String, required: true }, 
    additionalImages: [{ type: String }] 
});

const size = new mongoose.Schema({
    sizeName: {type: String, required: true},
});

const category = new mongoose.Schema({
    cateName: {type: String, required: true},
});


const comment = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    content: {type: String, required: true},
    rate: {type: String, required: true},
    cusID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
});

const cus = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    password: {type: String, required: true},
});

const color = new mongoose.Schema({
    colorName: {type: String, required: true},
});

const Product = mongoose.model("Product", product);
const Category = mongoose.model("Category", category);
const Comment = mongoose.model("Comment", comment);
const Customer = mongoose.model("Customer", cus);
const Size = mongoose.model("Size", size);
const Color =mongoose.model("Color", color);
module.exports = {
    Product,
    Category,
    Comment,
    Customer,
    Size,
    Color
};
