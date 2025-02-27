import User from '../models/userModel.js';
import Register from '../models/register.js';
import bcrypt from "bcrypt";
import { generateToken } from '../middlewares/jwt.js';
import { createUserSchema, registerSchema , updatePasswordSchema } from '../validations/userValidation.js';
// `getUsers` ek function hai jo users ki list ko fetch karta hai
export const getUsers = async (req, res) => {

  // Try block ka use hota hai jisme hum wo code likhte hain jisme error aane ke chances hote hain
  try {
    // `User.findAll()` Sequelize ORM ka method hai jo saare users ko database se fetch karta hai
    const users = await User.findAll();

    // Agar users mil jaate hain to JSON format mein response bheja jaata hai
    res.json(users);
  }

  // Agar try block mein koi error aata hai to catch block chalega
  catch (err) {
    // 500 status ka matlab hota hai server error aur error message JSON format mein bhej dete hain
    res.status(500).json({ error: err.message });
  }
};


// `createUser` ek function hai jo naye user ko database mein add karta hai
export const createUser = async (req, res) => {

  // Try block mein wo code likhte hain jisme error aane ke chances hote hain
  try {
    // Destructuring ka use karke request body se `name` aur `email` nikal rahe hain
    const { name, email } = req.body;

    // Pehle check kar rahe hain ki request ke saath koi file aayi hai ya nahi
    // Agar file aayi hai to `map()` method se file ka path `/uploads/filename` mein convert kar rahe hain
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    await createUserSchema.validate(
      { name, email, images: imageUrls },
      { abortEarly: false }
    );

    // Database mein dekh rahe hain ki diya gaya email already exist karta hai ya nahi
    const existingUser = await User.findOne({ where: { email } });

    // Agar user already exist karta hai to 400 status ke saath message bhej rahe hain
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Naya user create kar rahe hain aur images ko JSON array mein convert karke save kar rahe hain
    const newUser = await User.create({
      name,               // User ka naam
      email,              // User ka email
      images: JSON.stringify(imageUrls) // Images ko JSON format mein save kar rahe hain
    });

    // 201 status ka matlab hota hai ki resource successfully create ho gaya hai
    res.status(201).json({ message: "User created successfully", user: newUser });
  }

  // Agar try block mein koi error aata hai to catch block chalega
  catch (error) {
    // 500 status ka matlab hai internal server error aur error message bhej dete hain
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// `updateUser` ek function hai jo existing user ka data update karta hai
export const updateUser = async (req, res) => {
  try {
    // URL se `id` ko nikal rahe hain jo user ka unique ID hota hai
    const { id } = req.params;

    // Request body se `name` aur `email` ko destructure kar rahe hain
    const { name, email } = req.body;

    // Agar files aayi hain to unhe `map()` function se `/uploads/filename` path mein convert kar rahe hain
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // `findByPk()` method ka use karke ID ke basis par user ko database se nikal rahe hain
    const user = await User.findByPk(id);

    // Agar user nahi milta to 404 status ke saath error message bhej rahe hain
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found' // User not found ka message bhejte hain
      });
    }

    // User ka data update kar rahe hain agar naya data aaya hai
    await user.update({
      name: name || user.name,        // Agar `name` nahi aaya to purana `name` hi rahega
      email: email || user.email,     // Agar `email` nahi aaya to purana `email` hi rahega
      images: imageUrls && imageUrls.length > 0 ? JSON.stringify(imageUrls) : user.images
    });

    // Update hone ke baad success response bhej rahe hain
    return res.status(200).json({
      success: true,
      message: 'User updated successfully', // Success message
      data: user // Updated user ka data bhej rahe hain
    });

  }

  // Agar koi error aata hai to catch block chalega
  catch (error) {
    // 500 status ka matlab hota hai internal server error aur error message bhej rahe hain
    return res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};


// `deleteUser` ek function hai jo user ko database se delete karta hai
export const deleteUser = async (req, res) => {
  try {
    // `id` ko URL se nikal rahe hain jo user ka unique ID hota hai
    const { id } = req.params;

    // `findByPk()` method ka use karke ID ke basis par user ko database se dhoond rahe hain
    const user = await User.findByPk(id);

    // Agar user nahi milta to 404 status ke saath message bhej rahe hain
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // `destroy()` method ka use karke user ko database se delete kar rahe hain
    await user.destroy();

    // Agar user successfully delete ho jata hai to success message bhej rahe hain
    res.status(200).json({ message: 'User deleted successfully' });
  }

  // Agar koi error aata hai to catch block chalega
  catch (error) {
    // 500 status ka matlab hai ki server side error aaya hai aur message bhej rahe hain
    res.status(500).json({ message: 'Internal server error' });
  }
};


// register
export const registerUser = async (req, res) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });
    // Request body se `name`, `email` aur `password` ko destructure kar rahe hain
    const { name, email, password } = req.body;
    // Yahan par user ke input se name, email aur password le rahe hain

    // Database se check kar rahe hain ki ye email already exist karti hai ya nahi
    const existingUser = await Register.findOne({ where: { email } });

    // Agar user already exist karta hai to 400 status code ke saath message bhej rahe hain
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Password ko hash kar rahe hain taki plain text password kabhi bhi database mein na jaye
    const hashedPassword = await bcrypt.hash(password, 10);
    // Yahan `bcrypt.hash()` method ka use ho raha hai jo password ko encrypt karta hai
    // `10` salt rounds hain jo encryption ko strong banate hain

    // Naya user database mein create kar rahe hain hashed password ke saath
    const newUser = await Register.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken({ id: newUser.id, email }); // Common Function Use Kiya

    // Agar sab kuch sahi hota hai to success response ke saath token bhejte hain
    res.status(201).json({ message: "User registered successfully", token });

  }

  // Agar koi error aata hai to catch block chalega
  catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Server Error" });
    // 500 status ka matlab hota hai ki koi server-side error aaya hai
  }
};


// get all profiles
export const fetchUsers = async (req, res) => {
  // `fetchUsers` ek asynchronous function hai jo database se sare users ko fetch karta hai
  try {
    // `Register.findAll()` method ka use karke saare users ko database se nikal rahe hain
    const users = await Register.findAll();

    // Agar users successfully mil jaate hain to response mein users ka data JSON format mein bhej rahe hain
    res.json({ users });
  }

  // Agar koi error aata hai to catch block chalega
  catch (error) {
    // Server side error ko 500 status ke saath JSON format mein bhej rahe hain
    res.status(500).json({ message: 'internal server error' });
  }
};


// login
export const loginUser = async (req, res) => {
  try {
    // `email` aur `password` ko request body se destructure kar rahe hain
    const { email, password } = req.body;

    //  Step 1: Check if user exists
    // Database se user ka email check kar rahe hain ki vo exist karta hai ya nahi
    const user = await Register.findOne({ where: { email } });

    // Agar user nahi milta to 404 status ke saath message bhejte hain
    if (!user) return res.status(404).json({ message: "User not found" });

    //  Step 2: Password Compare
    // `bcrypt.compare()` ka use karke input password aur hashed password ko compare kar rahe hain
    const isMatch = await bcrypt.compare(password, user.password);

    // Agar password match nahi karta to 400 status ke saath invalid credentials ka message bhejte hain
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    //  Step 3: JWT Token Generate
    // JWT token generate kar rahe hain jo user ID aur email ko payload mein rakhta hai
    const token = generateToken({ id: user.id, email });


    // Agar login successful hota hai to 200 status ke saath token aur message bhejte hain
    res.status(200).json({ message: "Login successful", token });
  }

  // Agar koi bhi error aata hai to catch block chalega aur server error ka message bhejega
  catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// update password
export const updatePassword = async (req, res) => {
  try {

    await updatePasswordSchema.validate(req.body, { abortEarly: false });

    const { email, password, newpassword } = req.body;
    //  Request body se email, old password aur new password ko get kiya ja raha hai

    //  User ko email se database mein find kar rahe hain
    const user = await Register.findOne({ where: { email } });
    if (!user) {
      // Agar user nahi milta to 404 status ke sath message bhejte hain
      return res.status(404).json({ message: "User not found" });
    }

    //  Old password ko compare kar rahe hain jo user ne diya hai database wale hashed password se
    const isOldPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isOldPasswordCorrect) {
      // Agar old password match nahi karta to 400 status aur message bhejte hain
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    //  Check kar rahe hain ki new password aur old password same to nahi hai
    const isSamePassword = await bcrypt.compare(newpassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password"
      });
    }

    //  New password ko hash kar rahe hain pehle `genSalt` se salt generate karke
    const salt = await bcrypt.genSalt(10); // Salt generate karna security ke liye hota hai
    const hashedPassword = await bcrypt.hash(newpassword, salt); // New password ko hash kar rahe hain

    //  Database mein user ka password update kar rahe hain
    await user.update({ password: hashedPassword });

    //  Password successfully update hone ke baad success message bhej rahe hain
    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    // Agar koi error aata hai to 500 status aur error message bhejte hain
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// delete user profile
export const deleteprofile = async (req, res) => {
  try {
    const { id } = req.params;
    //  URL ke params se user ka **id** le rahe hain

    //  User ko database se find kar rahe hain ID ke basis par
    const user = await Register.findByPk(id);
    // **findByPk()** method ka use hota hai Primary Key ke basis par record find karne ke liye

    if (!user)
      // Agar user nahi milta to 404 (Not Found) status aur message bhej dete hain
      return res.status(404).json({ message: "User not found" });

    //  Agar user mil jata hai to usko **destroy()** method se delete kar rahe hain
    await user.destroy();
    // Ye method user ko permanently delete kar deta hai database se

    //   Delete hone ke baad success message return kar rahe hain
    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    // Agar koi error aata hai to 500 (Internal Server Error) status aur error message bhej rahe hain
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

