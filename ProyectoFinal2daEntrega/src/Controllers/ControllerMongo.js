import productDao from '../daos/products/index.js'

const CRUD = async() =>{
    const productsToInsert = [
        { name: 'camisa', price: '100', stock:1 },
        { nombre: 'buzo', price: '200', stock:2},  
    ];
    /*INSERT*/
    let result = await productDao.insertMany(productsToInsert);
    console.log(result);
  }
  CRUD()

  export {CRUD}