const express = require('express');
const app = express();
const server = app.listen(8080,()=>console.log("Listening on 8080"));

app.set('views','./views')
app.set('view engine','pug')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let products = [];

       // Productos para probar la funcionalidad
//   [
//     {
//       title: 'vestido',
//       price: '1500',
//       thumbnail: 'https://cdn3.iconfinder.com/data/icons/fashion-beauty-vol-1/512/dress_women_fashion_apparel-128.png'
//     },
//     {
//       title: 'remera',
//       price: '900',
//       thumbnail: 'https://cdn1.iconfinder.com/data/icons/life-style-and-activities-fill-outline/64/shirt-t-tshirt-sport-apparel-clothes-cotton-128.png'
//     },
//     {
//       title: 'pantalon',
//       price: '3500',
//       thumbnail: 'https://cdn3.iconfinder.com/data/icons/fashion-beauty-vol-1/512/jeans_denim_trousers_pants-128.png'
//     }
//   ]

app.get('/',(req,res)=>{

    res.render('home')
})
app.post('/products',(req,res)=>{
    products.push(req.body);
    res.redirect('/')
    console.log(products)
})

app.get('/products', (req, res) =>{

        res.render('products', {products: products})
   
})
