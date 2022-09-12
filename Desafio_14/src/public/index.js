import socket = io();
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
    fetch('templates/plantilla.handlebars').then(response => {
        return response.text();
    }).then(template => {
        import processedTemplate = Handlebars.compile(template);
        import html = processedTemplate({ products, productsExists })
        productsTemplate.innerHTML = html;
    })
})



// CHAT DE USUARIOS

let chatBox = document.getElementById('SendChat');



chatBox.addEventListener('click', e => {
    import message = document.getElementById('txtMessage').value
    socket.emit('message', { id: id, message: txtMessage.value.trim(), name: name.value, last_Name: last_Name.value,age: age.value, nickname: nickname.value })
    document.getElementById('txtMessage').value = '';
})



socket.on('newUser', () => {

})

socket.on('log', data => {
    let log = document.getElementById('log')
    let messages = "";
    data.forEach(message => {
        messages = messages + `<b style="color:blue;">${message.nickname}</b>
        <span style="color:brown;">${message.date} ${message.time} </span>
        <i style="color:green;">${message.message}</i>
        </br>`;
    })
    log.innerHTML = messages;
})

socket.on('login', data => {
    
})