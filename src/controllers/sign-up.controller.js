import ProductModel from '../models/product.model.js';
import SignUpModel from '../models/sign-up.model.js'

export default class SignUpController {
    getSignUp(req, res) {
        res.render('sign-up');
    }

    getSignIn(req, res) {
        res.render('sign-in',{errorMessage:null});
    }

    postSignUp(req, res) {
        // console.log(req.body)
        const { fullname, email, password } = req.body;

        SignUpModel.add(fullname, email, password);
        res.render('sign-in',{errorMessage:null});
    }

    postSignIn(req, res) {
        // console.log(req.body);
        const { email, password } = req.body;
        const existingUserAccount = SignUpModel.checkUserExists(email, password);
        
        let products = ProductModel.get();
        if(existingUserAccount){
            // console.log(existingUserAccount);
            req.session.userEmail = email;
            return res.render('products', { products,user:existingUserAccount });
        }

        // console.log(products);
        const error = "Invalid Credentials";
        res.render('sign-in',{errorMessage:error});
    }
}