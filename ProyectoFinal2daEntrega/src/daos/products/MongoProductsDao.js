
import MongoContainer from '../../container/MongoContainer.js'

class MongoProductsDao extends MongoContainer {
  constructor() {
    super('products', {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    })
  }
}

export default MongoProductsDao