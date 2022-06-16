const fs = require('fs')

const path = __dirname+'/../files/products'

class ProductsContainer {

//devuelve todos los productos
    getAll = async () => {
        if (fs.existsSync(path)) {
            try {
                let data = await fs.promises.readFile(path, 'utf-8');
                let products = JSON.parse(data);
                return { status: "success", products: products }
            } catch (error) {
                return { status: "error", error: error }
            }
        } else {
            return { status: "success", products: [] }
        }
    }

    //devuelve un producto segun su ID
    getById = async (id) => {
        if (!id) return { satus: "error", error: "Id needed" }
        if (fs.existsSync(path)) {
            let data = await fs.promises.readFile(path, 'utf-8');
            let products = JSON.parse(data);
            //  Metodod find
            let product = products.find(u => u.id == id);
            if (product) return { status: "successs", product: product }
            else return { status: "error", error: "Product not Found" }
        }
    }


//    Crea o Agrega un producto con su Id

saveProduct = async (product) => {
    //Validations
    if (!product.title || !product.price) return { status: "error", error: "missing fields" }
    if (fs.existsSync(path)) {
        try {  //el archivo existe, pero esta vacio
            let data = await fs.promises.readFile(path, 'utf-8');
            let products = JSON.parse(data);
            if (products.length ===0){
                product.id = 1
                products.push(product)
                await fs.promises.writeFile(path, JSON.stringify([product], null, 2))
                return { status: "success", product:product }
            }
            product.id = products[products.length - 1].id + 1;
            products.push(product);
            await fs.promises.writeFile(path, JSON.stringify(products, null, 2));
            return { status: "success", product:product }
        } catch (error) {
            return { status: "error", message: error }
        }
    } else {        //El archivo no existe
        try{
            product.id = 1
            await fs.promises.writeFile(path, JSON.stringify([product], null, 2))
            return { status: "success", message: "Added Product" }
        }
        catch (error) {
            return { status: "error", message: error }
        }         
    }
}

//Actualiza un producto segun su Id

updateProduct = async (id, productNew) => {
      if (!id) return { satus: "error", error: "Id needed" }
    if (fs.existsSync(path)) {
        try {
            let newProducts= products.map((product) => {
                if(product.id===id){
                    return productNew;
                }else {
                    return product;
                }
        })
            return { status: "successs", message: "Product Update", id: id, product: productNew}
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
            let data = await fs.promises.readFile(path, 'utf-8');
            let products = JSON.parse(data);
            const index= products.findIndex(product => product.id == id);
            products.splice(index,1)
            await fs.promises.writeFile(path, JSON.stringify(products, null, 2))
            return { status: "successs", message: "Product Delete"}
        } catch (error) {
            return { status: "error", message: error }
        }
     }else{
        return {status:"success",products:[]}
     }
    }
}

module.exports = ProductsContainer