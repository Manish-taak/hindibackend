import { where } from 'sequelize';
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

// export const createUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const newUser = await User.create({ name, email });
//     res.json(newUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const createUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging
    console.log("Uploaded File:", req.file); // Debugging
    // this will return error if file is not found or anything else
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // fetching name and email from req and body

    const { name, email } = req.body;

    // fetching the image url

    const imageUrl = `/uploads/${req.file.filename}`; // Construct image URL

    // Debugging: Check values before inserting into DB
    console.log("Saving to DB:", { name, email, imageUrl });

    // creating the new user with image

    const newUser = await User.create({
      name,
      email,
      imageUrl, // Make sure this matches the Sequelize model
    });
    // return res if the user created succesfully 
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    // return error if in any case
    console.error("Database Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// update user


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from URL parameters
    const { name, email } = req.body; // Get name and email from request body

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
      email: email || user.email // Keep existing email if not provided
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
    // if any error it will console the error
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// register
const SECRET_KEY = "your_secret_key"; // Store this securely
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
console.log(name,email,password,"dataaaaaaaaaa")
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
    console.error(error);
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
    console.error(error);
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
