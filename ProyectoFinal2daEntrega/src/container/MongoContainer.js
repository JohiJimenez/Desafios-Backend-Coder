import mongoose from 'mongoose'

mongoose.connect(
'mongodb+srv://Johi:17418016jC@cluster0.nwwqozn.mongodb.net/ecommerce?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error('Cannot connect to MongoDB');
    console.log('Products\' collection connected with Mongo');
})


class MongoContainer {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema)
  }

  async getAll() {
    try {
      const products = await this.collection.find({})
      return products
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }
  async createProduct(product) {
    try {
      await this.collection.create(product)
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }
}



export default MongoContainer