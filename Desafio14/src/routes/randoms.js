
import express from 'express';
const { Router } = express;
const router = new Router();
import { fork } from "child_process";


router.get("/randoms", (req, res) => {
   
    let max = req.query.cant;
    if(!max){max = 10000}
    const randoms = fork('./src/utils/calculoRandom.js' )
    randoms.send(max)
    randoms.on('message', resultado => {
        res.json({ resultado })
    })
  });

  export default router