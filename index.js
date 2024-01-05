import express from 'express';
import ProductController from "./src/controllers/product.controller.js";
import ejsLayouts from 'express-ejs-layouts';
import path from "path";
import addProductValidation from './src/middlewares/validation.middleware.js';

const server = express();
// Parse Form data
server.use(express.urlencoded({ extended: true }));
// setup view engine settings
server.set('view engine', 'ejs');
server.set("views", path.join(path.resolve(),"src", "views"));

server.use(ejsLayouts);

// Create an instance of ProductController
const productController = new ProductController();
server.get('/', productController.getProducts);
server.get('/new', productController.getAddForm);
server.post('/',addProductValidation, productController.addnewProduct);
server.use(express.static('src/views'));

server.listen(3400,()=>{
    console.log("Server is live at port:-3400")
});