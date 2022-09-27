import fs from 'fs';

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const path_ = path.join(__dirname, '../files/products.js')


// Creo un fetch para codigo que voy a reutilizar
const fetch = async () => {
    let data = await fs.promises.readFile(path_, 'utf-8');
    let products = JSON.parse(data);
    return products;
}


class ProductManager {

    //    Crea o Agrega un producto con su Id
    createProduct = async (product) => {
        //Validations
        if (!product.title || !product.price) return { status: "error", error: "Missing Fields" }
        if (fs.existsSync(path_)) {
            try {  //el archivo existe, pero esta vacio
                let products = await fetch();
                if (products.length === 0) {
                    product.id = 1
                    await fs.promises.writeFile(path_, JSON.stringify([product], null, 2))
                    return { status: "success", message: "Product Add" }
                }
                // el archivo existe y tiene productos
                product.id = products[products.length - 1].id + 1;
                products.push(product);
                await fs.promises.writeFile(path_, JSON.stringify(products, null, 2));
                return { status: "success", message: "Product Add", }
            } catch (error) {
                return { status: "error", message: error }
            }
        }
        // No existe el archivo, es el primer producto
        product.id = 1
        await fs.promises.writeFile(path_, JSON.stringify([product], null, 2))
        return { status: "success", message: "Product Add" }

    }

    //devuelve todos los productos
    getAll = async () => {
        if (fs.existsSync(path_)) {
            try {
                let products = await fetch();
                return {products, productsExists: true }
            } catch (error) {
                return { status: "error", error: error }
            }
        }
        return { status: "success", products: [], productsExists: false }
    }
}


export default ProductManager;