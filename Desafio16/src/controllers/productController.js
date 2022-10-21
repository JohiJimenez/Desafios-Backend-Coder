import ProductService from "../services/productsService.js"

const productService = new ProductService.getInstance();

export async function getAll(req, res) {
   const products = await productService.getAll();
    products
        ? res.status(200).json(products)
        : res.status(400).json({"error": "there was a problem when trying to get the products"})
} 

export async function createProduct(req, res) {
    const {body} = req;
    const newProduct = await productService.createProduct(body);

    newProduct
        ? res.status(200).json({"success": "Product added with ID " + newProduct._id})
        : res.status(400).json({"error": "there was an error, please verify the body content match the schema"})
}