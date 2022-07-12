const socket = io();
let user;

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
    //Fetch sirve tambien para leer mis propios archivos internos 
    //en caso de necesitar una plantilla para mostrar
    //Fetch es una promesa
    fetch('templates/plantilla.handlebars').then(response => {
        return response.text();
    }).then(template => {
        const processedTemplate = Handlebars.compile(template);
        const html = processedTemplate({ products, productsExists })
        productsTemplate.innerHTML = html;
    })
})

// CHAT DE USUARIOS

let chatBox = document.getElementById('chatBox');

Swal.fire({
    title: "Ingresa al Chat",
    input: "text",
    text: "Ingresa tu Email",
    inputValidator: (value) => {  //valida que el texto del input no este vacio
        return !value && "¡Necesitas ingresar tu Email para poder usar el chat!"
    },
    allowOutsideClick: false //no puedes salir si das click afuera
}).then(result => {
    user = result.value;
    socket.emit('registered', user);
})

chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value.trim() }) //si le saco el trim me deja los espacios de antes del texto
            chatBox.value = "";
        }
    }
})

socket.on('newUser', (data) => {


})

socket.on('log', data => {
    let log = document.getElementById('log')
    let messages = "";
    data.forEach(message => {
        messages = messages + `<b style="color:blue;">${message.user}</b>
        <span style="color:brown;">${message.date} ${message.time} </span>
        <i style="color:green;">${message.message}</i>
        </br>`;
    })
    log.innerHTML = messages;
})