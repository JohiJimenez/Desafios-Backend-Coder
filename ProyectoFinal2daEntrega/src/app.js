import express from 'express';
import productsRouter from './routes/productsRouter.js'

const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/products',productsRouter);


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Listening on Port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))


app.use("*", (req, res) => {
  res.send({ error: "error", description: `Route ${req.url} method ${req.method} not implemented` });
});
