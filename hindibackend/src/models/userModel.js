import { DataTypes } from 'sequelize'; 
// 🔑 Sequelize se **DataTypes** ko import kar rahe hain, jo database ke column ka data type define karta hai.

import sequelize from '../config/database.js'; 
// 🔑 Apne **database ka connection** import kar rahe hain jahan se queries execute hoti hain.

const User = sequelize.define('User', { 
// ✅ Yahan **User** model define kiya ja raha hai jo table ka naam hoga.

  name: { 
    type: DataTypes.STRING, 
    // 🧠 **name** column ka data type **STRING** hai (Yani Text Value Store karne ke liye)

    allowNull: false 
    // 🔥 **allowNull: false** ka matlab hai ki ye field **empty** nahi ho sakti (Required Field)
  },

  email: { 
    type: DataTypes.STRING, 
    // 🧠 **email** ka data type bhi **STRING** hai
    
    allowNull: false 
    // 🔥 **allowNull: false** ka matlab hai ki email bhi **Required** field hai
  },

  images: {
    type: DataTypes.TEXT, 
    // 🖼️ Yahan **images** ko **TEXT** data type mein store kar rahe hain (Kyunki multiple images JSON string mein store hongi)

    allowNull: true 
    // ✅ Ye optional field hai (User ko image dena compulsory nahi hai)
  },
});

export default User; 
// ✅ Model ko export kar rahe hain taaki doosri files mein use ho sake
