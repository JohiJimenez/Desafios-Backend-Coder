import {createUser} from '../services/UserService.js';
import { usersModel } from "../model/users.js";
import bcrypt from 'bcrypt';
import ProductService from "../services/productsService.js"

const productService = new ProductService;

export async function register(req, res) {
    const username= req.body.username
    const password= req.body.password
    const email= req.body.email
    usersModel.findOne({username}, async (err, user) => {
      if (err) console.log(err);
      if (user){
        console.log(`User: ${username} already Exist`)
        res.render("errorRegister");
      } 
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new usersModel({
          username,
          password: hashedPassword,
          email
        });
        await createUser (userData);
        res.redirect("/login");
      }
    });
  };

  export async function registerView(req, res) {
    if (req.session.user) {
        console.log("Hay una sesion activa")
        res.redirect('/login')
    } else {
        res.render('register')
    }    
}

export async function loginView(req, res) {
 res.render('login')
}

export async function login(req, res) {
  let user = req.body.email;
  let products = await productService.getAll();
  return res.render("inicio",{nombre: user, products: products.products, productsExists: products.productsExists})
}

export async function logout (req, res) {
  req.session.destroy((err) => {
    if (!err) {
      res.render("bye");
    } else res.send({ status: "Logout ERROR", body: err });
  });
}
