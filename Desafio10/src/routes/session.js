const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();

router.get("/login", (req, res) => {
 return res.render("login.handlebars");
});

router.post("/login", (req, res) => {
  let username = req.body.name;
  console.log(username);
  req.session.user = username;
   return res.redirect('/');
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.render("bye.handlebars");
    } else res.send({ status: "Logout ERROR", body: err });
  });
  
  });

module.exports = router;