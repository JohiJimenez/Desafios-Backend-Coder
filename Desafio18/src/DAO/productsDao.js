import logger from "../utils/logger.js";

export class ProductsDao {

    constructor() {
        this.logger = logger;
        if (this.constructor === ProductsDao) {
            throw new Error('Class "BaseDao" cannot be instantiated')
        }
    }

    createProduct() {
        throw new Error('Method create() must be implemented')
    }

    getAll() {
        throw new Error('Method getAll() must be implemented')
    }

    deleteById() {
        throw new Error('Method deleteById() must be implemented')
    }
}