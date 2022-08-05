const socket = io();
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
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({ products, productsExists })
        productsTemplate.innerHTML = html;
    })
})



// CHAT DE USUARIOS

let chatBox = document.getElementById('SendChat');

Swal.fire({
    title: "Ingresa al Chat",
    input: "text",
    text: "Ingresa tu Email",
    inputValidator: (value) => {  //valida que el texto del input no este vacio
        return !value && "¡Necesitas ingresar tu Email para poder usar el chat!"
    },
    allowOutsideClick: false //no puedes salir si das click afuera
}).then(result => {
    id = result.value;
    socket.emit('registered', id);
})


chatBox.addEventListener('click', e => {
    const message = document.getElementById('txtMessage').value
    socket.emit('message', { id: id, message: txtMessage.value.trim(), name: name.value, last_Name: last_Name.value,age: age.value, nickname: nickname.value })
    document.getElementById('txtMessage').value = '';
})

socket.on('newUser', (data) => {


})

socket.on('log', data => {
    let log = document.getElementById('log')
    let messages = "";
    data.forEach(message => {
        messages = messages + `<b style="color:blue;">${message.id}</b>
        <span style="color:brown;">${message.date} ${message.time} </span>
        <i style="color:green;">${message.message}</i>
        </br>`;
    })
    log.innerHTML = messages;
})