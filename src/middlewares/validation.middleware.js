import ProductModel from '../models/product.model.js'
import { body,validationResult } from 'express-validator';

//^ using express validator
const addProductValidation = async(req,res,next)=>{
    const rules = [
        body("name").isEmpty().withMessage("Name is required"),
        body("desc").isEmpty().withMessage("Description is required"),  
        body("price").isFloat({gt:0}).withMessage("Price is required and should be non negative"),
        body("imageUrl").isEmpty().withMessage("Image Url is required"),
        body("imageUrl").isURL().withMessage("Image Url is not valid")
    ]
    //promise is used as this is I/O operation and async
    await Promise.all(rules.map(rule => rule.run(req)));
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        // console.log(errors.array()[0].msg);
        return res.render('new-product',{errors:errors.array()});
    }
    next();
}

//^ without using express validator
/* const addProductValidation = (req,res,next)=>{
//this receives name, desc ,price and imageUrl fron res.body validating all these form items and pushing errors to an array
    const {name,desc,price,imageUrl} = req.body;
    const errors = [];
    if(!name){
        errors.push("Name is required");
    }
    if(!desc){
        errors.push("Description is required");
    }
    if(!price || price<0){
        errors.push("Price is required and should be non negative");
    }
    if(!imageUrl){
        errors.push("Image Url is required");
    }
    try {
        const validUrl = new URL(imageUrl);
    } catch (err) {
        errors.push("Image Url is not valid");
    }
    if(errors.length > 0){
        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render('new-product',{errors,});
    }
    // should i add next() as this is a middleware
    next();
} 
 */
export default addProductValidation;