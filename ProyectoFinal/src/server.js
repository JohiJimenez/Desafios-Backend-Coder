require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars');
const { engine } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const logger = require('./middlewares/logger');
const { productRouter } = require('./modules/products/productRoutes');
const { cartRouter } = require('./modules/cart/cartRoutes');
const { userRouter } = require('./modules/user/UserRoutes');
const { ordersRouter } = require('./modules/orders/ordersRoutes');
const { chatRouter } = require('./modules/chat/chatRoutes');

const database = require('./configs/mongoAtlas');
database.connect();


const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { socketServer } = require('./modules/chat/socketServer');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(logger.info);

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('views', './src/public/hbs_views');
app.set('view engine', 'hbs');


app.use('/', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);
app.use('/chat', chatRouter);

io.on('connection' , (socket) => {
    socketServer(io,socket);
}) 

app.use(logger.errorRoute);
app.use(logger.catchError);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
