const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();


router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.render("/inicio")
  }else{
     return res.render("login.handlebars");
  }

})

router.post("/login", (req, res) => {
  username = req.body.name;
  req.session.user = username;

   return res.render("inicio",{nombre: req.session.user});
});


router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.render("bye.handlebars");
    } else res.send({ status: "Logout ERROR", body: err });
  });
  
  });

module.exports = router