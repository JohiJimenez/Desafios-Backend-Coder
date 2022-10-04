
import express from 'express';
import { usersModel } from "../model/users.js";
import bcrypt from 'bcrypt';
import {register, registerView, loginView, login, logout} from '../controllers/userController.js';
const { Router } = express;
const router = new Router();
import passport from 'passport';
import {Strategy} from 'passport-local';

const localStrategy= Strategy
passport.use(new localStrategy({usernameField: "email"},
(email, password, done) => {
    usersModel.findOne({email }, (err, user) => {
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

router.get("/login",loginView)
router.post("/login",passport.authenticate("local", { failureRedirect: "errorLogin" }), login)
router.get("/register",registerView)
router.post("/register",register)
router.get("/logout",logout)

export default router