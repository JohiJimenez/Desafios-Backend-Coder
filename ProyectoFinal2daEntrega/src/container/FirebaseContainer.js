import admin from 'firebase-admin'
//import config from '../key/keyFirebase.json'

//let serviceAccount= config

import { readFile } from 'fs/promises';
const serviceAccount = JSON.parse(
  await readFile(
    new URL('../key/keyFirebase.json', import.meta.url)
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ProyectoJohi.firebaseio.com"
});


const db = admin.firestore();
const collection = db.collection('products')

class FirebaseContainer {
    create = async (product) => {
        let doc = collection.doc();
        if (!product.name || product.stock || product.precio) return "El producto necesita nombre, precio y stock"
        await doc.create(product)
        return {
            status: "success",
            msg: "New Product Created"
        }
    }
    read = async () => {
        const snapShot = await collection.get();
        let docs = snapShot.docs;
        let products = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            stock: doc.data().stock,
        }))
        return {
            status: "success",
            payload: products,
        }
    }
  }
export default FirebaseContainer