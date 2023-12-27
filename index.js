import express from 'express';
import ProductController from './src/controllers/product.controller.js';

//creating express server
const server = express();

//creating instance of ProductController class
const productController = new ProductController();

server.get("/",productController.getProducts);

server.get('/', (req,res)=>{
    return res.send('Welcome to Inventory App');
});

server.listen(3400,()=>{
    console.log("Server listening on port 3400")
});