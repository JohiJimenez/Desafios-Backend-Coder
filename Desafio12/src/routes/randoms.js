
const express = require('express');
const { Router } = express;
const router = new Router();
const { fork } = require("child_process");

router.get("/randoms", (req, res) => {
    let max = req.query.cant;
    if(!max){max = 100}
    const computo = fork('./src/utils/calculoRandom.js' )
    computo.send(max)
    computo.on('message', resultado => {
        res.json({ resultado })
    })
    console.log(max)
  });

  module.exports = router