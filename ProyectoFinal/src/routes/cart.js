const express = require('express');
const router = express.Router();

const uploader = require('../multer/Upload')
const CartManager = require('../container/CartManager')


const cartMethods = new CartManager();



router.post('/', (req, res) => {
    let cart = req.body;
    cartMethods.createCart(cart).then(result => res.send(result));
})


router.get('/', (req, res) => {
    cartMethods.getAll().then(result => res.send(result))
})


router.delete('/:id', (req, res) => {
    let id = req.params.id
    cartMethods.deleteById(id).then(result => res.send(result))
})

router.get('/:id/products', (req, res) => {
    let id = req.params.id
    cartMethods.getProductsById(id).then(result => res.send(result))
})

router.post('/:cartId/products', (req, res) => {
    let cartId = req.params.cartId;
    let productId = req.body;
    cartMethods.addProducts(cartId, productId).then(result => res.send(result))
})

router.delete("/:id/products/:id_prod", (req, res) => {
    let cartId = req.params.id;
    let productId = req.params.id_prod;
    cartMethods.deleteProductById(cartId, productId).then(result => res.send(result));
});

module.exports = router;