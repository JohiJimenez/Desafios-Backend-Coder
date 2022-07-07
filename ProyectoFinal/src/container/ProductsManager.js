const fs = require('fs');
const path = __dirname + '/../files/products.js'
const isAdmin= require('../container/Middleware')


// Creo un fetch para codigo que voy a reutilizar
const fetch = async () => {
    let data = await fs.promises.readFile(path, 'utf-8');
    let products = JSON.parse(data);
    return products;
}


class ProductsManager {

    //   Devuelve todos los productos
    getAll = async () => {
        if (fs.existsSync(path)) {
            try {
                let products = await fetch();
                return { status: "success", products: products, productsExists: true}
            } catch (error) {
                return { status: "error", error: error }
            }
        }
        return { status: "Products Empty", products: [], productsExists: false }
    }

    
    //devuelve un producto segun su ID
    getById = async (id) => {
        if (!id) return { status: "error", error: "Id needed" }
        if (fs.existsSync(path)) {
           let products= await fetch();
            let product = products.find(u => u.id == id);
            if (product) return { status: "successs", product: product}
            else return { status: "error", error: "Product not Found" }
        }
    }

    //    Crea o Agrega un producto con su Id
    createProduct = async (product) => {
        //Validations
        if (!product.title || !product.description || !product.code || !product.price || !product.stock) return { status: "error", error: "Missing Fields" }
        if (fs.existsSync(path)) {
            try {  //el archivo existe, pero esta vacio
                let products = await fetch();
                if (products.length === 0) {
                    product.id = 1
                    product.timestamp = new Date()
                    await fs.promises.writeFile(path, JSON.stringify([product], null, 2))
                    return { status: "success", message: "Product Add", ProductId: product.id, authorized: isAdmin }
                }
                // el archivo existe y tiene productos
                product.id = products[products.length - 1].id + 1;
                product.timestamp = new Date()
                products.push(product);
                await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
                return { status: "success", message: "Product Add", ProductId: product.id, authorized: isAdmin }
            } catch (error) {
                return { status: "error", message: error }
            }
        }
        // No existe el archivo, es el primer producto
        product.id = 1
        product.timestamp = new Date()
        await fs.promises.writeFile(path, JSON.stringify([product], null, 2))
        return { status: "success", message: "Product Add", ProductId: product.id, authorized: isAdmin }

    }

    //Actualiza un producto segun su Id

    updateProduct = async (id, body) => {
        if (!id) return { status: "error", error: "Id needed" }
        if (fs.existsSync(path)) {
            try {
                let products = await fetch();
                let result = products.map((product) => {
                    if (product.id === id) {
                        body = Object.assign({ id: id, ...body });
                        return body;
                    } else {
                        return product;
                    }
                })
                await fs.promises.writeFile(path, JSON.stringify(result, null, 2));
                return { status: "Success", message: "Product Update", ProductUpdate: body, authorized: isAdmin};
            } catch (error) {
                return { status: "error", message: error }
            }
        }
    }

    //Elimina un producto segun su Id
    deleteById = async (id) => {
        if (!id) return { satus: "error", error: "Id needed" }
        if (fs.existsSync(path)) {
            try {
                let products= await fetch();
                const index = products.findIndex(product => product.id == id);
                products.splice(index, 1)
                await fs.promises.writeFile(path, JSON.stringify(products, null, 2))
                return { status: "successs", message: "Delete Product Id # "+ id , authorized: isAdmin}
            } catch (error) {
                return { status: "error", message: error }
            }
        } else {
            return { status: "success", products: [] }
        }
    }

}


module.exports = ProductsManager;