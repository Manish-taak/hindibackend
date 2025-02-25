// import sequelize from '../config/database.js';
// import Register from './register.js';
// import User from './userModel.js';
// // यहाँ दो चीज़ें इम्पोर्ट की जा रही हैं:

// // sequelize → यह डेटाबेस कनेक्शन (database.js से) इम्पोर्ट कर रहा है।
// // User → यह यूज़र मॉडल (userModel.js से) इम्पोर्ट कर रहा है।


// const db = { sequelize, User };
// const db = { sequelize, Register };
// // ✅ एक ऑब्जेक्ट (db) बनाया गया है, जिसमें:

// // sequelize → डेटाबेस कनेक्शन है।
// // User → यूज़र मॉडल है।
// // 📌 इसका उपयोग करके हम अन्य फाइल्स में डेटाबेस और यूज़र मॉडल को आसानी से एक्सेस कर सकते हैं।



// export { sequelize };
// export default db;  
// // ✅ डेटाबेस कनेक्शन और db ऑब्जेक्ट को एक्सपोर्ट किया गया है:

// // sequelize को नाम से एक्सपोर्ट (named export) किया गया है।
// // db ऑब्जेक्ट को डिफ़ॉल्ट एक्सपोर्ट (default export) किया गया है।
