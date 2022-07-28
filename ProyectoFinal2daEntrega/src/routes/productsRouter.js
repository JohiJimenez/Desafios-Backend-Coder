import express from 'express'
//import productDao from '../daos/products/index.js'
import controllerProducts from  '../Controllers/controllerProducts.js'
import {Router} from 'express'

const router = new Router();

router.get('/',controllerProducts.getAllProducts)
router.post('/',controllerProducts.addNewProduct)

export default router