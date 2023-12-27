import path from 'path';
import ProductModel from '../models/product.model.js';
export default class ProductController{
    getProducts(req,res){
        console.log(ProductModel.get());
        return res.sendFile(path.join(path.resolve(),"src","views","products.html"))
    }
}