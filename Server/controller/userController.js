import User from "../model/userModel.js";
import multer from "multer";
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export const create = async(req, res)=>{
    try{
        upload.single('profileImage')(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ errorMessage: 'File upload error' });
            }

            const newUser = new User(req.body);

            if (req.file) {
                newUser.profileImage = req.file.filename; // Store the uploaded image filename
            }

            const { email } = newUser;

            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(400).json({ message: "User already exists." });
            }

            const savedData = await newUser.save();
            res.status(200).json({ message: "User created successfully." });
        });


    } catch(error){
        res.status(500).json({errorMessage: error.message})

    }
}

export const getAllUsers = async(req,  res) =>{
    try {
        const userData = await User.find();
        if(!userData || userData.length === 0 ){
            return res.status(404).json({message: "User data not found. "});
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
        
    }
}

export const getUserById = async(req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found. "});
        }
        res.status(200).json(userExist)
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
        
    }
}

export const update = async( req, res)=>{
    try {
        upload.single('profileImage')(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ errorMessage: 'File upload error' });
            }

            const id = req.params.id;
            const userExist = await User.findById(id);
            if (!userExist) {
                return res.status(404).json({ message: "User not found." });
            }

            const updatedData = req.body;

            if (req.file) {
                updatedData.profileImage = req.file.filename; // Store the new uploaded image filename
            }

            const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
            res.status(200).json({ message: "User updated successfully." });
        });
        
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
        
    }
}

export const deleteUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found. "});
        }
        await User.findOneAndDelete(id);
        res.status(200).json({message: "User deleted successfully"})
        
        
    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}