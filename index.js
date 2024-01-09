import express from 'express';
import ProductController from "./src/controllers/product.controller.js";
import ejsLayouts from 'express-ejs-layouts';
import path from "path";
import addProductValidation from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import SignUpController from './src/controllers/sign-up.controller.js';

const server = express();
server.use(express.static('public'));
// Parse Form data
server.use(express.urlencoded({ extended: true }));
// setup view engine settings
server.set('view engine', 'ejs');
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

// Create an instance of ProductController
const productController = new ProductController();
const signUpController = new SignUpController();
server.get('/signup',signUpController.getSignUp)
server.get('/signin',signUpController.getSignIn);

server.post('/signup',signUpController.postSignUp)
server.post('/signin',signUpController.postSignIn)

server.get('/', productController.getProducts);
server.get('/new', productController.getAddForm);
server.get('/update-product/:id', productController.getUpdateProductView);


server.post(
    '/',
    uploadFile.single("imageUrl"),
    addProductValidation,
    productController.addnewProduct
);

server.post(
    '/update-product',
    productController.postUpdateProductReq
);

server.post(
    '/delete-product/:id',
    productController.deleteProduct
);

server.use(express.static('src/views'));

server.listen(3400, () => {
    console.log("Server is live at port:-3400")
});