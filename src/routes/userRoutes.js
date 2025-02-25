import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, registerUser, loginUser } from '../controllers/userController.js';
import upload from '../middlewares/multerConfig.js';
// ✅ यहाँ दो चीज़ें इम्पोर्ट की जा रही हैं:

// express → यह Express.js का मुख्य लाइब्रेरी है, जिससे हम API बना सकते हैं।
// getUsers और createUser → ये दोनों यूज़र कंट्रोलर (userController.js) से इम्पोर्ट किए गए हैं, जो डेटाबेस से डेटा प्राप्त करने और नया यूज़र जोड़ने के लिए काम में आते हैं।

const router = express.Router();
// यह Express का एक मेथड है, जिससे हम रूट्स (API endpoints) को मैनेज कर सकते हैं।
// यह एक मिनी-ऐप की तरह काम करता है, जो मैन रूट्स को मैनेज करने में मदद करता है।

router.get('/users', getUsers);
// GET /users:
// जब कोई "/users" API को कॉल करेगा, तब getUsers फ़ंक्शन चलेगा।
// डेटाबेस से सभी यूज़र्स की लिस्ट (User List) को प्राप्त (fetch) करने के लिए उपयोग होता है।

// router.post('/users', createUser);
router.post("/users", upload.array("images"), createUser);


// register route
router.post("/register", registerUser);
// login
router.post("/login", loginUser);
// ✅ POST /users:
// जब कोई "/users" API को POST मेथड से कॉल करेगा, तब createUser फ़ंक्शन चलेगा।
// नए यूज़र को डेटाबेस में जोड़ने (Insert new user) के लिए उपयोग होता है।
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

export default router;
// ✅ राउटर को एक्सपोर्ट किया गया है, ताकि इसे server.js या किसी अन्य फाइल में उपयोग किया जा सके।