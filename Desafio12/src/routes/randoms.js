
const express = require('express');
const { Router } = express;
const router = new Router();
const { fork } = require("child_process");

router.get("/randoms", (req, res) => {
    let max = req.query.cant;
    if(!max){max = 10000}
    const randoms = fork('./src/utils/calculoRandom.js' )
    randoms.send(max)
    randoms.on('message', resultado => {
        res.json({ resultado })
    })
    console.log(max)
  });

  module.exports = router