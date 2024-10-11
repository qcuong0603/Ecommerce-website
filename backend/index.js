const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const productRoute = require("./route/product/productList")
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();


// Database Connection with MongoDB
mongoose.connect("mongodb+srv://trgson:mongodb.trgs0n@cluster0.zuh84.mongodb.net/e-commerce")

// API Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Schema for creating products

app.use("/productList",productRoute);

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port " + port)
    }else{
        console.log("Error: "+error)
    }
})