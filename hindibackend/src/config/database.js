import { Sequelize } from 'sequelize';
//  Yahan Sequelize package ko import kiya hai jo database ke sath interaction ke liye use hota hai.

import dotenv from 'dotenv'; 
dotenv.config();
//  **dotenv** se environment variables ko load kar rahe hain, jo **.env** file mein hote hain.
//  Yeh sensitive information jaise database name, username aur password ko secure banata hai.

const sequelize = new Sequelize(
  process.env.DB_NAME,  // 🔑 Database ka naam jo **.env** file se aa raha hai.
  process.env.DB_USER,  // 🔑 Database ka username.
  process.env.DB_PASS,  // 🔑 Database ka password.
  {
    host: process.env.DB_HOST,  // 🔑 Database ka host (Localhost ya Remote Server ka URL)
    dialect: 'mysql',           // 🔑 Yahan database ka type define kiya hai (Yani **MySQL**)
  }
);
//  Yeh connection establish karta hai Sequelize aur MySQL database ke beech.

sequelize.sync({ force: false });
//  Yeh line tables ko database mein automatically create karta hai agar wo pehle se exist nahi karti.
// **force: false** ka matlab hai ki existing tables ko delete nahi karega.

export default sequelize;
//  Connection ko export kiya taaki doosre files mein use kiya ja sake.
