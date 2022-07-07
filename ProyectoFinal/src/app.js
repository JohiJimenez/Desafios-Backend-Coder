const express = require('express');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart')

PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static('files'));

app.use('/products', productsRouter);
app.use('/carts', cartRouter);

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


app.use("*", (req, res) => {
  res.send({ error: "error", description: `Route ${req.url} method ${req.method} not implemented` });
});

