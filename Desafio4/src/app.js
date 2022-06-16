const express = require ('express')
const productsRouter= require ('./routes/products')

const port= 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))
app.use('/products',productsRouter);
app.use(express.static('public')) //npm start o usando src usemos rutas relativas __dirname
app.use(express.static('files'))

const server = app.listen(port,()=> console.log (`listening on Port ${port}`))