const { ProductController } = require('./ProductController');
const { authenticateToken, isAdmin } = require('../../middlewares/auth');
const productController = new ProductController();
const productRouter = require('express').Router();

productRouter.get('/', authenticateToken, productController.getAllProducts);
productRouter.get('/category/:category', authenticateToken, productController.getByCategory);
productRouter.get('/id/:id', authenticateToken, productController.getProduct);
productRouter.get('/put/:id', authenticateToken, isAdmin, productController.handlerUpdate);

productRouter.post('/', authenticateToken, isAdmin, productController.createProduct);

productRouter.put('/:id', authenticateToken, productController.updateProductById);

productRouter.delete('/:id', authenticateToken, productController.deleteProductById);

productRouter.post('/put/:id', authenticateToken, isAdmin, productController.updateProductById);

productRouter.post('/delete/:id', authenticateToken, isAdmin, productController.deleteProductById);

module.exports = {
    productRouter
}