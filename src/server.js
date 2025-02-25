import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';


// इस कोड में 5 मुख्य पैकेज इम्पोर्ट किए गए हैं:

// express → Express.js का उपयोग API सर्वर बनाने के लिए किया जाता है।
// cors → Cross-Origin Resource Sharing (CORS) को हैंडल करता है, जिससे API को किसी भी फ्रंटेंड से एक्सेस किया जा सकता है।
// dotenv → .env फ़ाइल से कॉन्फ़िगरेशन वैरिएबल्स (जैसे: DB_NAME, DB_USER, PORT) को लोड करने के लिए।
// sequelize → MySQL डेटाबेस से कनेक्शन स्थापित करने के लिए Sequelize ORM का उपयोग करता है।
// userRoutes → यूज़र से संबंधित API रूट्स (जैसे GET /users, POST /users) को इम्पोर्ट करता है।



dotenv.config();
// ✅ .env फ़ाइल में डेटाबेस की जानकारी और पोर्ट नंबर स्टोर होते हैं, जिसे यह लाइन लोड करती है।



const app = express();
const PORT = process.env.PORT || 5000;
// Express सर्वर बनाया गया और पोर्ट को .env फ़ाइल से लिया गया। अगर .env में पोर्ट सेट नहीं है, तो डिफ़ॉल्ट 5000 पोर्ट का उपयोग होगा।

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Middleware क्या करता है?

// cors() → API को किसी भी ओरिजिन (जैसे React/Vue फ्रंटेंड) से एक्सेस करने देता है।
// express.json() → API में JSON डेटा को सही ढंग से पढ़ने के लिए।



// Routes  API रूट्स सेट करना 
app.use('/api', userRoutes);


// Database Connection डेटाबेस से कनेक्शन बनाना
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// ✅ डेटाबेस कनेक्ट करने की प्रक्रिया:
// sequelize.authenticate() → चेक करता है कि MySQL डेटाबेस सही से कनेक्ट हो रहा है या नहीं।
// sequelize.sync({ alter: true }) → डेटाबेस स्कीमा को अपडेट करता है ताकि टेबल ऑटोमेटिकली बने।
// अगर कनेक्शन फेल हो जाता है, तो error log दिखाएगा।
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Express सर्वर को स्टार्ट करता है और http://localhost:5000 पर रन करता है।




// 🔹 इस कोड का उपयोग क्यों किया जाता है?
// ✅ Express.js का उपयोग करके API सर्वर बनाया गया।
// ✅ Sequelize ORM का उपयोग करके MySQL डेटाबेस कनेक्ट किया गया।
// ✅ CORS और JSON Middleware को इनेबल किया गया।
// ✅ यूज़र डेटा मैनेज करने के लिए API रूट्स /api/users जोड़े गए।
// ✅ डेटाबेस ऑटो-सिंकिंग को इनेबल किया गया।





// 🔹 1. CORS Middleware (app.use(cors()))
// 👉 CORS (Cross-Origin Resource Sharing) एक सुरक्षा फ़ीचर है जो यह तय करता है कि कौन से डोमेन (Websites / Frontend Applications) आपके API को एक्सेस कर सकते हैं।

// ✅ इसे क्यों इनेबल किया जाता है?
// अगर आप Frontend और Backend को अलग-अलग सर्वर पर होस्ट कर रहे हैं (जैसे React/Vue/Angular का फ्रंटेंड और Express.js का API बैकेंड), तो ब्राउज़र सुरक्षा कारणों से API को ब्लॉक कर सकता है।

// ✅ क्या होगा अगर CORS को इनेबल न करें?
// अगर आप इसे इनेबल नहीं करते, तो ब्राउज़र "CORS Policy Error" देगा और API से डेटा नहीं मिलेगा।

// 🔹 उदाहरण:
// अगर आपका Frontend (http://localhost:3000) है और Backend (http://localhost:5000), तो जब फ्रंटेंड बैकेंड से डेटा लेने की कोशिश करेगा, तो CORS Error आएगा।
// इसे रोकने के लिए cors() मिडलवेयर लगाया जाता है।





// 🔹 2. JSON Middleware (app.use(express.json()))
// 👉 यह Middleware यह सुनिश्चित करता है कि आपका सर्वर JSON फॉर्मेट में डेटा को सही से पढ़ और प्रोसेस कर सके।

// ✅ इसे क्यों इनेबल किया जाता है?
// जब हम Frontend से JSON डेटा भेजते हैं (जैसे React/Vue/Angular से POST या PUT API कॉल में), तो Express इसे पढ़ नहीं सकता जब तक हम express.json() को इनेबल न करें।

// ✅ क्या होगा अगर इसे इनेबल न करें?
// अगर आप app.use(express.json()) को नहीं लगाते, तो req.body undefined रहेगा और डेटा बैकेंड तक नहीं पहुंचेगा।

// 🔹 उदाहरण:
// अगर आप React से एक API कॉल करते हैं:
