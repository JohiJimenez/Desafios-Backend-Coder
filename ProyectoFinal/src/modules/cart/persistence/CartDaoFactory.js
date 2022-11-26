const { CartDaoMongoAtlas } = require("./daos/CartDaoMongoAtlas")


class CartDaoFactory {
    getDao(type) {
        if (type === 'production') { return CartDaoMongoAtlas.getInstance() }
        else if (type === 'development') { return CartDaoMongoDB.getInstance() }
        else { console.error('error connecting to Dao') }
    }
}

module.exports = {
    CartDaoFactory
}