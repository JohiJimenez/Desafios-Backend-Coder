const express = require('express');
const router = express.Router();
const ProductsContainer = require('../container/products')
const uploader = require('../multer/Upload')

const productsMethods = new ProductsContainer();


router.get('/',(req,res)=>{
    productsMethods.getAll().then(result=>res.send(result))
})


router.post('/',uploader.single('file'),(req,res)=>{
    let product = req.body;
    let file = req.file;
    if(!file)  return res.status(500).send({error:"Couldn't upload file"})
     product.thumbnail = req.protocol+"://"+req.hostname+":8080/img/"+file.filename;
    productsMethods.saveProduct(product).then(result=>res.send(result));
})

router.get('/:id',(req,res)=>{
    let id = req.params.id
    productsMethods.getById(id).then(result=>res.send(result))
})

router.put('/:id',uploader.single('file'),(req,res)=>{
    let id = req.params.id;
    let file= req.file;
    let product=req.body;
    if(!file)  return res.status(500).send({error:"Couldn't upload file"})
     product.thumbnail = req.protocol+"://"+req.hostname+":8080/img/"+file.filename;
    productsMethods.updateProduct(id,product).then(result=>res.send(result))
})

router.delete('/:id',(req,res)=>{
    let id = req.params.id
    productsMethods.deleteById(id).then(result=>res.send(result))
})

module.exports = router;