import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = "your_secret_key"; 

// Token Generate
export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

// Token Verify
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
