import express from 'express';
import ProductController from "./src/controllers/product.controller.js";
import ejsLayouts from 'express-ejs-layouts';
import path from "path";

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
server.post('/', productController.addnewProduct);
server.use(express.static('src/views'));

server.listen(3400);