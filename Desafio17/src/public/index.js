const socket = io.connect();
let id;

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
