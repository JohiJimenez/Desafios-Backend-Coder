const socket = io.connect();
let id;

//FORMULARIO

let form = document.getElementById("productForm");
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((val, key) => sendObj[key] = val);
    socket.emit("sendProduct", sendObj);
    form.reset();
})


socket.on('productsReg', (data) => {
    let products = data.products;
    let productsExists = data.productsExists
    let productsTemplate = document.getElementById("productsTemplate");
    fetch('inicio.handlebars').then(response => {
        return response.text();
    }).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({ products, productsExists })
        productsTemplate.innerHTML = html;
    })
})

socket.on('login', data => {
    
})