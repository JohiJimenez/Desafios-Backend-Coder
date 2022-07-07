const fs = require('fs');

const ProductsManager = require('../container/ProductsManager');
const productsMethods = new ProductsManager();
const pathToProducts = __dirname + '/../files/products.js'

const path = __dirname + '/../files/carts.js'

const fetch = async () => {
    let data = await fs.promises.readFile(path, 'utf-8');
    let carts = JSON.parse(data);
    return carts;
}
class CartManager {

    // Crea o Agrega un carrito y devuelve si Id
    createCart = async (cart) => {
        if (fs.existsSync(path)) {
            try {  //el archivo existe, pero esta vacio
                let carts = await fetch();
                if (carts.length === 0) {
                    cart.cartId = 1
                    cart.timestamp = new Date();
                    cart.products = []
                    await fs.promises.writeFile(path, JSON.stringify([cart], null, 2))
                    return { status: "success", message: "Cart Add", CartId: cart.id }
                }
                // el archivo existe y tiene carritos
                cart.cartId = carts[carts.length - 1].cartId + 1;
                cart.timestamp = new Date()
                cart.products = []
                carts.push(cart);
                await fs.promises.writeFile(path, JSON.stringify(carts, null, 2));
                return { status: "success", message: "Cart Add", CartId: cart.id }
            } catch (error) {
                return { status: "error", message: error }
            }
        }
        // No existe el archivo, es el primer carrito
        cart.cartId = 1
        cart.timestamp = new Date();
        cart.products = []
        await fs.promises.writeFile(path, JSON.stringify([cart], null, 2))
        return { status: "success", message: "Cart Add", CartId: cart.id }
    }


    // Obtiene todos los carritos
    getAll = async () => {
        if (fs.existsSync(path)) {
            try {
                let carts = await fetch();
                return { status: "success", carts: carts, cartsExists: true }
            } catch (error) {
                return { status: "error", error: error }
            }
        }
        return { status: "success", carts: [], productsExists: false }
    }

    //Elimina un carrito segun su Id
    deleteById = async (id) => {
        if (!id) return { status: "error", error: "Id needed" }
        if (fs.existsSync(path)) {
            try {
                let carts = await fetch();
                const index = carts.findIndex(cart => cart.cartId == id);
                carts.splice(index, 1)
                await fs.promises.writeFile(path, JSON.stringify(carts, null, 2))
                return { status: "successs", message: "Delete Card Id #" + id }
            } catch (error) {
                return { status: "error", message: error }
            }
        } else {
            return { status: "success", carts: [] }
        }
    }

    // Listar todos los productos guardados en un Carrito segun su id
    getProductsById = async (id) => {
        if (!id) return { satus: "error", error: "Id needed" }
        if (fs.existsSync(path)) {
            let carts = await fetch();
            let cart = carts.find(u => u.cartId == id);
            if (cart) return { status: "successs", products: cart.products }
            else return { status: "error", error: "Id Cart not Found" }
        }
    }

    // Incorporar Productos al Carrito por su Id de Productos
    addProducts = async (cartId, productId) => {
        if (fs.existsSync(path)) {
            let carts = await fetch();
            let cart = carts.find(u => u.cartId == cartId);
            cart.products.push(productId)
            return{ cart: cart.products} 
        }
    }

    // Eliminar un producto por su Id de Producto y Id de Carrito
    deleteProductById = async (cartId, productId) => {
        if (fs.existsSync(path)) {
            let carts = await fetch();
            let cart = carts.find(u => u.cartId == cartId);
            if (cart) {
                cart.products = cart.products.filter((product) => product.id != productId)
                await fs.promises.writeFile(path, JSON.stringify(carts, null, 2))
                return { status: "successs", message: "Product Delete" }
            } else {
                return { status: "error", error: "Id Cart not Found" }
            }
        }
    }

}



module.exports = CartManager