const { OrdersDaoMongoAtlas } = require("./daos/OrdersDaoMongoAtlas")

class OrdersDaoFactory {

    getDao(type) {
        if (type === 'production') { return OrdersDaoMongoAtlas.getInstance() }
        else if (type === 'development') { return OrdersDaoMongoDB.getInstance() }
        else { console.error('error connecting to Dao') }
    }
}

module.exports = {
    OrdersDaoFactory
}