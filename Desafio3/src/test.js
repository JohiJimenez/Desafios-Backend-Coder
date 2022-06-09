const Container= require('./Container.js')

let product={
  title: "arroz",
  price: 200,
  thumbnail: "https://abcd.com.ar/00268300/00268392.jpg"
}

// let product={
//   title: "carne",
//   price: 100,
//   thumbnail: "https://abcd.com.ar/00268300/00268392.jpg"
// }

// let product={
//     title: "fideos",
//     price: 50,
//     thumbnail: "https://abcd.com.ar/00268300/00268392.jpg"
//   }

 //Modulos
saveProduct(product).then(result=> console.log(result))
