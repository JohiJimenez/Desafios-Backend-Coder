const express = require('express');
const router = express.Router();
const ProductsManager = require('../container/ProductsManager.js')
const uploader = require('../multer/Upload')
const Middleware= require ('../container/Middleware')
const productsMethods = new ProductsManager();

router.get('/', (req, res) => {
    productsMethods.getAll().then(result => res.send(result))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    productsMethods.getById(id).then(result => res.send(result))
})

router.post('/',uploader.single('file'),Middleware.isAdmin, (req, res) => {
    let product = req.body;
    let file = req.file;
    if (!file) return res.status(500).send({ error: "Couldn't upload file" })
    product.thumbnail = req.protocol+"://"+req.hostname+":8080/img/"+file.filename;
    productsMethods.createProduct(product).then(result => res.send(result));
})

router.put('/:id',Middleware.isAdmin, (req, res) => {
    const id = req.params.id
    const product = req.body
    productsMethods.updateProduct(id, product).then(result => res.send(result))
})

router.delete('/:id',Middleware.isAdmin, (req, res) => {
    const id = req.params.id
    productsMethods.deleteById(id).then(result => res.send(result))
})

module.exports = router;