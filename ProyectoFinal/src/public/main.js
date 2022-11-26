const socket = io();

const sendMessage = (e) => {
    const message = document.getElementById('message').value;
    const email = document.getElementById('email').value
    const newMessage = { message, email };
    if (message !== '') {
        socket.emit('new_message', newMessage);
    }
    return false;
}

const createMessageTag = (messageInfo) => {
    const { email, message, time_Stamp } = messageInfo;
    return `
    <div>
        <strong style='color:blue'>${email}</strong>
        <p style='color:brown'>${time_Stamp}</p>
        <i style='color:green'>${message}</i>
    </div>
    `;
}

const addMessages = (message) => {
    if (message !== '') {
        const finalMessage = message.map(message => createMessageTag(message)).join(' ');
        document.getElementById('messages').innerHTML = finalMessage;
    }
}

socket.on('messages', (messages) => addMessages(messages));