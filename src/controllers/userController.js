import User from '../models/userModel.js';
// यह User मॉडल (userModel.js से) इम्पोर्ट किया गया है, जिससे हम डेटाबेस में स्टोर किए गए यूज़र डेटा को एक्सेस और मैनेज कर सकते हैं।

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ यह फ़ंक्शन /users API को हैंडल करता है और सभी यूज़र्स की लिस्ट को डेटाबेस से लाता है।
// 📌 स्टेप-बाय-स्टेप समझें:

// User.findAll() → यह Sequelize का मेथड है, जो सभी यूज़र्स की लिस्ट डेटाबेस से निकालता है।
// res.json(users); → अगर डेटा मिल जाता है, तो उसे JSON फॉर्मेट में रिस्पॉन्स में भेज दिया जाता है।
// एरर हैंडलिंग → अगर कोई एरर आती है, तो "500 (Internal Server Error)" के साथ एरर मैसेज भेजा जाता है।

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ यह फ़ंक्शन /users API को हैंडल करता है और नया यूज़र जोड़ने की सुविधा देता है।
// 📌 स्टेप-बाय-स्टेप समझें:

// req.body → फ्रंटएंड या API से आने वाले डेटा को name और email के रूप में एक्सेस करता है।
// User.create({ name, email }) → यह Sequelize का मेथड है, जो नया यूज़र डेटाबेस में जोड़ता है।
// res.json(newUser); → नया यूज़र क्रिएट होने के बाद, उसे JSON फॉर्मेट में रिस्पॉन्स में भेज दिया जाता है।
// एरर हैंडलिंग → अगर कोई गलती होती है, तो "500 (Internal Server Error)" के साथ एरर मैसेज भेजा जाता है।


// GET /users → सभी यूज़र्स की लिस्ट को डेटाबेस से लाता है।
// POST /users → नया यूज़र डेटाबेस में जोड़ता है।
