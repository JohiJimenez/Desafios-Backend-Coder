import ProductService from "../../services/productsService.js"
const productsService = new ProductService;

export const GetAllProductosQuery = `
    getAllProductos: [Producto]
`
export async function getAllProductos() {
    return productsService.getAll();
}