import path from 'path';
import ProductModel from '../models/product.model.js';

export default class ProductController {
    getProducts(req, res) {
        let products = ProductModel.get();
        // console.log(products);
        res.render('products', { products});
    }

    getAddForm(req,res){
        return res.render('new-product',{errors:null})
    }

    addnewProduct(req,res){
        // access data from form.
        // console.log(req.body);
        ProductModel.add(req.body);
        let products = ProductModel.get();
        res.render('products', {products: products});
    }

    getUpdateProductView(req,res,next){
        const id = req.params.id;
        const ProductFound = ProductModel.getById(id);
        if(ProductFound){
            return res.render('update-product',{product:ProductFound,errors:null})
        } 
        else{
             res.status(401).send("Product not found");
        }
    }
    postUpdateProductReq(req,res,next){
        console.log(req.body);
        ProductModel.update(req.body);
        let products = ProductModel.get();
        res.render('products', {products: products});
    }
}

