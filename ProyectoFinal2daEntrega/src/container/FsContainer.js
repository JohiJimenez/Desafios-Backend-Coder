import fs from 'fs'

// connección a la base de datos
class FsContainer {
    constructor(file) {
        this.file = file
      }
      async readFile() {
        try {
          return JSON.parse(await fs.promises.readFile(this.file, 'utf-8'))
        } catch (error) {
          throw new Error(`Leyendo error: ${error}`)
        }
      }
    
      async writeFile(data) {
        try {
          fs.promises.writeFile(this.file, JSON.stringify(data), 'utf-8')
        } catch (error) {
          throw new Error(`Escribiendo error: ${error}`)
        }
      }
    
    
      async getAll() {
        try {
            const products = await this.readFile()
            return {products: products}
    
        } catch (error) {
          await this.writeFile([])
          const products = await this.readFile()
         return {products: products}
        }
      }
    //    Crea o Agrega un producto con su Id
    async createProduct(product) {
      try {
        const products = await this.readFile()
        products.push(product)
        await this.writeFile(products)  
        return {products: products}
      } catch (error) {
        console.log(`ERROR: ${error}`)
      }
         }


}

export default FsContainer