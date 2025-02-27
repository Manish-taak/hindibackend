import { DataTypes } from "sequelize"; 
// 🔑 Sequelize se **DataTypes** ko import kar rahe hain, jo database ke column ka data type define karta hai

import sequelize from "../config/database.js"; 
// 🔑 Apne database ka connection import kar rahe hain

const Register = sequelize.define("Register", { 
// ✅ Yahan ek **Register** model define kiya ja raha hai, jo **sequelize.define()** ka use karke hota hai

    id: {
        type: DataTypes.UUID, 
        // 🧠 **UUID** ek unique ID hoti hai jo automatically generate hoti hai (Universally Unique Identifier)
        
        defaultValue: DataTypes.UUIDV4, 
        // 🔑 Ye automatically **UUIDV4** generate karta hai jab koi naya user create hota hai
        
        primaryKey: true, 
        // 🚩 Ye **id** ko Primary Key banata hai (Unique aur Har User ke liye alag hota hai)
    },

    name: {
        type: DataTypes.STRING, 
        // 🧠 Yahan **name** ka datatype String hai
        
        allowNull: false, 
        // 🔑 **allowNull: false** ka matlab hai ki ye field empty nahi ho sakti (Required Field)
    },

    email: {
        type: DataTypes.STRING, 
        // 🧠 **email** ka datatype String hai
        
        allowNull: false, 
        // 🔑 Email bhi required field hai
        
        unique: true, 
        // 🔥 Ye ensure karta hai ki ek email sirf ek hi user ke liye ho sakti hai (Duplicate email allowed nahi hai)
    },

    password: {
        type: DataTypes.STRING, 
        // 🧠 Password bhi String type ka hota hai
        
        allowNull: false, 
        // 🔑 Password bhi required field hai
    }
});

export default Register; 
// ✅ Model ko export kar rahe hain taaki isko kisi bhi file mein import kar sakein
