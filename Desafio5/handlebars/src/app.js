const express = require ('express')
const handlebars = require ('express-handlebars')

const port= 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))


app.engine('handlebars',handlebars.engine());
app.set('views','./views');
app.set('view engine','handlebars');



let products=[];
app.get('/',(req,res)=>{
    //res.send(products);
    res.render('home')
})

app.post('/products',(req,res)=>{
    products.push(req.body);
    res.redirect('/')
    console.log(products)   
})

app.get('/products', (req, res) =>{
    if (products.length > 0) {
        res.render('products', {products: products, productsExists: true })
    } else {
        res.render('products', {products: products, productsExists: false })
    }
})

const server = app.listen(port,()=> console.log (`listening on Port ${port}`))