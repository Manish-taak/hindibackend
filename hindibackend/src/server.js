import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import fs from 'fs';

// Install Dependencies
// npm install express sequelize mysql2 dotenv bcrypt jsonwebtoken cors

dotenv.config();

// Express application ka ek instance banaya gaya hai
const app = express();

// Port ko environment variable se set kiya gaya hai ya default 5000 set kiya gaya hai
const PORT = process.env.PORT || 5000;

// CORS middleware ko use kiya gaya hai taaki doosri origins se request allow ho
app.use(cors());

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
async function connectDB() {
  try {
    // Database se connection ki jaanch ki ja rahi hai
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.'); // Connection successful hone par message show kiya gaya hai

    // Database ko synchronize kiya gaya hai taaki tables automatically create ho sakein
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized.'); // Synchronization ka message show kiya gaya hai
  } catch (error) {
    // Agar koi error aaye to wo console me show hoga
    console.error('❌ Unable to connect to the database:', error);
  }
}

connectDB(); // Database se connection banane ke liye function ko call kiya gaya hai

// Server ko specified port par listen karne ke liye start kiya gaya hai
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`); // Server start hone ka message console me show kiya gaya hai
});
