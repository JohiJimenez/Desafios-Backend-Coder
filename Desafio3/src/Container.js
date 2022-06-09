const fs= require ('fs')

const path='./files/productos.json'
class Container{
    constructor(path){
    this.path= path;
    }
}

saveProduct = async (product)=> {
    //Validations
    if (!product.title || !product.price || !product.thumbnail) return {status:"error", error: "missing fields"}
    try {
     if (fs.existsSync(path)){
         let data= await fs.promises.readFile(path,'utf-8');
         let products= JSON.parse(data);
         let id = products[products.length-1].id+1;
         product.id=id;
         products.push(product);
         await fs.promises.writeFile(path,JSON.stringify(products,null,2));
         return {status: "success", message: "Added Product"}

     }else{ //El archivo no existe
         product.id= 1
         await fs.promises.writeFile(path,JSON.stringify([product],null,2))
         return {status: "success", message: "Added Product"}
     }
    }catch (error) {
        return {status: "error", message:error}
    }
 } 

 
module.exports = Container


