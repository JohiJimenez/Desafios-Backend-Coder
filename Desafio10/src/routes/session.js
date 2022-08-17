const express = require('express');
const app = express();
const { Router } = express;
const router = new Router();


router.get("/login", (req, res) => {
     return res.render("login");
  }
)

router.post("/login", (req, res) => {
  username = req.body.name;
  req.session.user = username;
  return res.redirect("/");
});


router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.render("bye");
    } else res.send({ status: "Logout ERROR", body: err });
  });
  
  });

module.exports = router