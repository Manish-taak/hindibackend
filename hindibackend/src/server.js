import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import fs from 'fs';

// import User from './models/userModel.js';
// import Register from './models/register.js';

// methode one 
// import "../src/models/userModel.js";
// import "../src/models/register.js";


// Install Dependencies
// npm install express sequelize mysql2 dotenv bcrypt jsonwebtoken cors

dotenv.config();

// Express application ka ek instance banaya gaya hai
const app = express();

// Port ko environment variable se set kiya gaya hai ya default 5000 set kiya gaya hai
const PORT = process.env.PORT || 5000;

// CORS middleware ko use kiya gaya hai taaki doosri origins se request allow ho
express().use(cors());

// Express middleware ko use kiya gaya hai taaki incoming JSON data ko parse kiya ja sake
app.use(express.json());

// Uploads directory ka path generate kiya gaya hai
const uploadDir = path.join(process.cwd(), 'uploads');

// Agar uploads directory exist nahi karti hai to nayi directory create ki ja rahi hai
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Recursive option se parent directories bhi create hoti hain
  console.log('✅ Uploads folder created'); // Folder banne ka message console me show kiya gaya hai
}

// Static files ko serve karne ke liye middleware use kiya gaya hai
app.use('/uploads', express.static(uploadDir));

// User routes ko `/api` prefix ke saath use kiya gaya hai
app.use('/api', userRoutes);

// Database se connection banane ke liye async function banaya gaya hai









/**
 *  methode one Ek sath sari table create karne ke liye 
 * 
 */
async function connectDB() {
  try {
    // Database se connection ki jaanch ki ja rahi hai
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.'); // Connection successful hone par message show kiya gaya hai

    // Database ko synchronize kiya gaya hai taaki tables automatically create ho sakein
    await sequelize.sync({ alter: false });
    console.log('✅ Database synchronized.'); // Synchronization ka message show kiya gaya hai

    // single table sync
    // await User.sync({ alter: true });
    // console.log("✅ User table synchronized.");

    // await Register.sync({ alter: true });
    // console.log("✅ Register table synchronized");
    
  } catch (error) {
    // Agar koi error aaye to wo console me show hoga
    console.error('❌ Unable to connect to the database:', error);
  }
}


// async function connectDB() {
//   try {
//       await sequelize.authenticate();
//       console.log('✅ Database connected successfully.');

//       // Individual table sync
//       await User.sync({ alter: true });
//       console.log("✅ User table synchronized.");

//       await Product.sync({ alter: true });
//       console.log("✅ Product table synchronized.");

//   } catch (error) {
//       console.error('❌ Database Sync Error:', error);
//   }
// }


connectDB(); // Database se connection banane ke liye function ko call kiya gaya hai

// Server ko specified port par listen karne ke liye start kiya gaya hai
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`); // Server start hone ka message console me show kiya gaya hai
});



// Express Kya Hai?
// Node.js ek JavaScript runtime environment hai jo JavaScript code ko server-side execute karne ki facility deta hai.

// Express Kya Hai?
// 👉 Express ek Node.js ka framework hai jo server banane ka kaam easy kar deta hai.


// Node.js vs Express.js

// Feature    	          Node.js               	Express.js
// Definition	            JavaScript runtime	    Node.js ka framework
// Kaam                 	Server-side scripting	  Server banane ko easy karna
// Speed               	  Fast	                  Faster development
// Code Complexity    	  Zyada	                  Kam
// Routing              	Manual	                Automatic routing
// Middleware          	Complex	                Easy to use   




