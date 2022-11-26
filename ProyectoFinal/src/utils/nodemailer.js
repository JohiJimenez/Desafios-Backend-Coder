const transport = require("./transport");

const sendEmailNewOrder = (fromEmail, toEmail, order ) => {
  let li = ""
  order.items.forEach(item => {
    li = li + `<li> ${item.title} - quantity: ${item.quantity} </li>`
  }) 
  transport.sendMail({
    from: `Johana Jimenez ${fromEmail}`,
    to:toEmail,
    html:`<h1>List of items:</h1>
            <ul> 
                ${li}
            </ul>
          <h2> Delivery Address: ${order.delivery_Address} </h2>
          <h2> Total: ${order.total_Price}$ </h2>`,
    subject:`New Purchase from the User: ${order.email}`
}).then((data)=> {
    console.log("Email Send");
}).catch(console.log)
}

const sendEmailNewUser = (fromEmail, toEmail, user) => {
  transport.sendMail({
    from: `Johana Jimenez ${fromEmail}`,
    to:toEmail,
    html:`<h1>New user details:</h1>
            <ul> 
                <li>Email: ${user.email}</li>
                <li>Name: ${user.name}</li>
                <li>Address: ${user.address}</li
            </ul>`,
    subject:`New User Created: ${user.email}`
}).then((data)=> {
    console.log("Email Send");
}).catch(console.log)
}

module.exports = {sendEmailNewOrder, sendEmailNewUser}