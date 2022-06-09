const express = require('express'); // Requerimos Express
const fs= require ('fs')
const Container= require('./Container.js')

const file = new Container('./files/products.json')

//Leo mi archivo Json y lo Parseo
const json_products = fs.readFileSync('./files/productos.json', 'utf-8');
let products = JSON.parse(json_products);


const app = express(); //Inicializamos en una variable

const server= app.listen(8080, ()=> {
    try{
       console.log('listen port 8080') 
    }
    catch(error){
        console.log(error)
    }
})

app.get('/',(req,res)=> {
    res.send('<h1 style="color: #233;">Desafio Servidor Express</h1>')
})

app.get('/products', async (req,res)=>{ 
     const newProducts = products.map((product) => (`${product.title} $ ${product.price}`))
     res.send(` Lista de Productos: ${newProducts}` )
})


app.get('/productRandom', async (req, res) =>{
 const id = Math.floor(Math.random() * 3) + 1   
 let product= products.find(product=>product.id==id); 
 res.send(`El Producto con id ${id} es: ${product.title}`)
 console.log(product)
})
