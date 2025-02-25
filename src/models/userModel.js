import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
// ✅ यहाँ दो चीज़ें इम्पोर्ट की जा रही हैं:

// DataTypes → यह Sequelize का एक पार्ट है, जो हमें विभिन्न प्रकार के डेटा टाइप (जैसे STRING, INTEGER, BOOLEAN, आदि) का उपयोग करने की सुविधा देता है।
// sequelize → यह डेटाबेस कनेक्शन को ../config/database.js फाइल से इम्पोर्ट कर रहा है।


const User = sequelize.define('User', {
  // ✅ sequelize.define('User', {...}) के माध्यम से एक "User" नाम की टेबल बनाई जा रही है।


  

  name: { type: DataTypes.STRING, allowNull: false },
  //   ✅ name फ़ील्ड:
  // type: DataTypes.STRING → यह फ़ील्ड एक स्ट्रिंग (text) होगी।
  // allowNull: false → इस फ़ील्ड को खाली (null) नहीं छोड़ा जा सकता।



  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  // email फ़ील्ड:
  // type: DataTypes.STRING → यह भी एक स्ट्रिंग (text) होगी।
  // allowNull: false → यह फ़ील्ड खाली (null) नहीं हो सकती।
  // unique: true → इस फ़ील्ड के लिए हर यूज़र का ईमेल अलग (unique) होगा, यानी एक जैसा ईमेल दो बार नहीं आ सकता।

});

export default User;
// ✅ मॉडल को एक्सपोर्ट किया गया है, ताकि इसे अन्य फाइल्स में उपयोग किया जा सके।