const fs= require ('fs')

const path='./files/productos.txt'
class Container{
   constructor(path){
       this.path=path
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


 getById= async(id)=>{
    if(!id) return {satus:"error", error: "Id needed"}
    if (fs.existsSync(path)){
        let data= await fs.promises.readFile(path,'utf-8');
        let products= JSON.parse(data);
        //  Metodod find
        let product= products.find(u=>u.id==id);
        if (product) return {status: "successs", product: product}
        else return {status: "error", error: "Product not Found" }
    }
}



getAll= async()=>{
    if (fs.existsSync(path)){
        let data= await fs.promises.readFile(path,'utf-8');
        let products= JSON.parse(data);
        return {status: "successs", products: products }
    }
}



deleteById= async (id)=>{
    if(!id) return {satus:"error", error: "Id needed"}
    if (fs.existsSync(path)){
        let data= await fs.promises.readFile(path,'utf-8');
        let products= JSON.parse(data);
        let newProducts= products.filter(product => product.id!==id)
        await fs.promises.writeFile(path, JSON.stringify(newProducts,null,2))
        return {status: "successs", message: "Product Delete"}
    }  
}


deleteAll= async(products)=>{
    if (fs.existsSync(path)){
        fs.unlinkSync(path)
        return {status: "successs", message: "Products Delete" }
    }
}


module.exports = Container