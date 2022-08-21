const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();


router.get("/login", (req, res) => {
  if (!req.session.user) {
    res.render("login")
  }
 })

router.post("/login", (req, res) => {
  username = req.body.name;
  req.session.user = username;
  return res.render("inicio",{nombre: req.session.user})
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

module.exports = router