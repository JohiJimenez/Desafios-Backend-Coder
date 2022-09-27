import express from 'express';
import passport from 'passport';
import {Strategy} from 'passport-local';
import bcrypt from'bcrypt';
const { Router } = express;
const router = new Router();
import ProductManager from '../container/ProductManager.js'

const productsService = new ProductManager;


import {usersService} from '../model/users.js'


const localStrategy= Strategy
passport.use(new localStrategy({usernameField: "email"},
(email, password, done) => {
    usersService.findOne({email }, (err, user) => {
      if (err) console.log(err);
      if (!user) {
        console.log(`User : ${email} Not Found`)
        return done(null, false);
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) console.log(err);
        if (isMatch) return done(null, user);
        if (!isMatch) {
          console.log('Invalid Password')
          return done(null, false);
        }
      });
    });
  })
);




router.get("/login",(req, res) => {
     res.render("login")
 })

router.post("/login",passport.authenticate("local", { failureRedirect: "errorLogin" }),
async (req, res) => {
  req.session.user = req.user.email;
  let products = await productsService.getAll();
  return res.render("inicio",{nombre: req.session.user, products: products.products, productsExists: products.productsExists})
});



router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.render("bye");
    } else res.send({ status: "Logout ERROR", body: err });
  });
  
  });

  router.get("/errorLogin", (req, res) => {
    res.render("errorLogin");
  });

export default router