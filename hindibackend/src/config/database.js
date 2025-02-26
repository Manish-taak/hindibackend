import { Sequelize } from 'sequelize';
// ➡️ Sequelize लाइब्रेरी को इम्पोर्ट किया गया है, जो ORM (Object-Relational Mapping) टूल है और MySQL के साथ काम करने में मदद करता है।

import dotenv from 'dotenv';
dotenv.config();
// dotenv लाइब्रेरी को इम्पोर्ट किया गया है, जिससे हम .env फाइल में रखे गोपनीय (sensitive) डेटा जैसे कि डेटाबेस का नाम, यूज़रनेम, पासवर्ड आदि को सुरक्षित रूप से एक्सेस कर सकते हैं।

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});
// process.env.DB_NAME → डेटाबेस का नाम .env फाइल से लिया जाता है।
// process.env.DB_USER → डेटाबेस का यूज़रनेम।
// process.env.DB_PASS → डेटाबेस का पासवर्ड।
// host: process.env.DB_HOST → डेटाबेस सर्वर का होस्ट नेम (localhost या कोई अन्य)।
// dialect: 'mysql' → Sequelize को बताया गया है कि यह MySQL के साथ काम करेगा।

sequelize.sync({ force: false })

export default sequelize;
// ➡️ Sequelize इंस्टेंस को एक्सपोर्ट कर दिया गया है, ताकि इसे दूसरी फाइलों में इम्पोर्ट करके डेटाबेस से कनेक्शन स्थापित किया जा सके।
