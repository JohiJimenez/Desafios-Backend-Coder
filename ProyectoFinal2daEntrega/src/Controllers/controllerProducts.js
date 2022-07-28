import productDao from '../daos/products/index.js'

const controllerProducts ={
    getAllProducts: async (req, res ) => {
        try {
          const all = await productDao.getAll()
          res.json (all)
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
      },
      
        addNewProduct: async (req, res) => {
   
          try {
            const products = await productDao.getAll()
              const newProduct = {
              name: req.body.name,
              stock: req.body.stock,
            }
            await productDao.createProduct(newProduct)
            res.json(newProduct)
        
          } catch (error) {
            console.log(`ERROR: ${error}`)
          }
        }
      }

export default controllerProducts