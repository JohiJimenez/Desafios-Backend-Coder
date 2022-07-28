import MongoProductDao from './MongoProductsDao.js'
import FsProductsDao from './FsProductsDao.js'
import FirebaseProductDao from './FirebaseProductDao.js'
const productsPath = 'src/files/products.json';

const dbToUse = 'fs';

let productDao;

switch (dbToUse) {
	case 'mongo':
		productDao = new MongoProductDao();
		console.log("Conectado Con Mongo")
		break;
	case 'fs':
		productDao = new FsProductsDao(productsPath);
		console.log("Conectado Con Fs")
		break;
	case 'firebase':
		productDao = new FirebaseProductDao();
		console.log("Conectado Con Firebase")
	default:
		break;
}

export default productDao