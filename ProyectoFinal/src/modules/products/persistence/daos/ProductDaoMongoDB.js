let instance = null;

class ProductoDaoMongoDB {
    constructor() {

    }

    static getInstance() {
        if (!instance) instance = new ProductoDaoMongoDB();
        return instance;
    }

}

module.exports = {
    ProductoDaoMongoDB
}