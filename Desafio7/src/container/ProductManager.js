import options from "../options/mysqlconfig.js"
import knex from "knex";

const database = knex(options);


class ProductManager {


  //Agrega un producto si existe la tabla o la crea y agrega el producto
  addProduct = async (product) => {
    let tableExist = await database.schema.hasTable('products');
    if (tableExist) {
      await database('products').insert(product)
      console.log("Product Added")
      return { status: "success", message: "Product Add" }
    } else {
      await database.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('title').nullable(false);
        table.float('price').nullable(false);
        table.string('thumbnail');
      })
      await database('products').insert(product)
      console.log("Tablet Created")
      return { status: "success", message: "Tablet Created", message: "Product Added" }
    }

  }
  //Obtiene Los Productos
  getAll = async () => {
    let data = await database.from('products').select('*')
    let products = JSON.parse(JSON.stringify(data));
    return { status: "success", products: products, productsExists: true }
  }

}

export default ProductManager;