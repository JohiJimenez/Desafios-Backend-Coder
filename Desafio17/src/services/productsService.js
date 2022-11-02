import { productsModel } from "../model/products.js";
import {ProductsDao} from "../DAO/productsDao.js";

export default class ProductService extends ProductsDao{

    static getInstance() {
        return new ProductService();
    }

    constructor() {
        if(typeof ProductService.instance === 'object') {
            return ProductService.instance;
        }
        super();
        ProductService.instance = this;
        return this;
    }
    

    async getAll() {
        try {
            let products = await productsModel.find();
            return { status: "success", products: products}
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    

    async create(object) {
        try {
            return await productsModel.create(object)
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    
    
}