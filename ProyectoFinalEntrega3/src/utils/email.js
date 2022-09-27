import { createTransport } from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config({path:'./src/.env'});
import logger from './logger.js'


const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASS
    }
});



const adminEmail = process.env.EMAIL_ADMIN;

 const notifyNewUser = async (data) => {
  try {
    const status = await transporter.sendMail({
      from: "Nuevo Registro NODEJS",
      to: adminEmail,
      subject: "Nuevo registro",
      html: `
            <h1>Nuevo usuario registrado</h1>
            <ul>
            <li>Username: ${data.username}</li>
            <li>Email: ${data.email}</li>
            </ul>
            `,
    });
    logger.info(status)
  } catch (error) {
    logger.error(`Mailer error: ${error}`)
  }
 };

export {notifyNewUser}
