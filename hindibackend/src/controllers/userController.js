import User from '../models/userModel.js';
import Register from '../models/register.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    // Check if files exist
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Ensure database model has a field for images (as array)
    const newUser = await User.create({
      name,
      email,
      images: JSON.stringify(imageUrls) // Save as JSON array
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



// update user


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL parameters
    const { name, email } = req.body; // Get name and email from request body
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    // Find user by ID
    const user = await User.findByPk(id);
    // it will return res if user not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user details
    await user.update({
      name: name || user.name, // Keep existing name if not provided
      email: email || user.email, // Keep existing email if not provided
      images: JSON.stringify(imageUrls) // Save as JSON array
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });

  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// delete user

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; //get id from req.params

    // Check if user exists
    const user = await User.findByPk(id);
    // if user not found then retrnedd user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    await user.destroy();
    // sent res after user is  deleted
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// register
const SECRET_KEY = "your_secret_key"; // Store this securely
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await Register.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await Register.create({ name, email, password: hashedPassword });

    // Generate JWT Token
    const token = jwt.sign({ id: newUser.id, email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Register.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email
    const user = await Register.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Compare new password with existing hashed password
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password cannot be the same as the old password" });
    }

    // 3️⃣ Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Update the password in the database
    await user.update({ password: hashedPassword });

    // 5️⃣ Send success response
    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server Error" });
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
