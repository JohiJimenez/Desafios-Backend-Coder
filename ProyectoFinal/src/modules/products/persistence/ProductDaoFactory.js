const {ProductDaoMongoAtlas} = require('./daos/ProductDaoMongoAtlas');
const { ProductDaoMongoDB } = require('./daos/ProductDaoMongoDB');

class ProductDaoFactory {
    getDao(type) {
        if (type === 'production') { return ProductDaoMongoAtlas.getInstance() }
        else if (type === 'development') { return ProductDaoMongoDB.getInstance() }
        else { console.error('error connecting to Dao') }
    }
}

module.exports = {
    ProductDaoFactory
}