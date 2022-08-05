const express = require('express');
const faker= require ('faker')

const app = express();
const { Router } = express;
const router = new Router();

faker.locale= 'es'

router.get("/", (req, res) => {
    const arrayFaker = [];
    
    for (let index = 0; index < 5; index++) {
        arrayFaker.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        })
    }
    res.render('products', {products: arrayFaker, productsExists: true })
    
});

module.exports = router;