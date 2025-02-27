// Multer ko import kiya ja raha hai, jo file upload ke liye middleware hai
import multer from 'multer'; 

// Path module ko import kiya ja raha hai, jo file aur directory paths ke saath kaam karta hai
import path from 'path'; 

// Storage configuration banayi ja rahi hai
// Yeh batata hai ki images kis folder me upload hongi aur file ka naam kya hoga
const storage = multer.diskStorage({
    // Destination function decide karti hai ki file kis folder me jayegi
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // `uploads/` folder me file ko save kiya ja raha hai
    },
    // Filename function se unique naam diya ja raha hai taaki ek hi naam ki file overwrite na ho
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // File ka naam current timestamp aur original naam ke saath set kiya ja raha hai
    }
});

// File filter function banaya gaya hai
const fileFilter = (req, file, cb) => {
    // Allowed file types ko regular expression me define kiya gaya hai
    const fileTypes = /jpeg|jpg|png/; 

    // File extension ko check kiya ja raha hai
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); 
    
    // Mimetype ko check kiya ja raha hai
    const mimetype = fileTypes.test(file.mimetype);

    // Agar extension aur mimetype dono sahi hai to file allow hogi
    if (extname && mimetype) {
        cb(null, true);
    } else {
        // Agar galat file type ho to error message diya jayega
        cb(new Error('Only JPEG, JPG, and PNG files are allowed!'), false); 
    }
};

// Multer ka upload setup kiya ja raha hai
const upload = multer({
    storage: storage, // Storage configuration set ki gayi hai
    limits: { fileSize: 5 * 1024 * 1024 }, // File size limit 5MB set ki gayi hai
    fileFilter: fileFilter // File filter function ko set kiya gaya hai
});

// Upload middleware ko export kiya ja raha hai taaki doosri files me use ho sake
export default upload;
