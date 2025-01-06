import loginModel from "../model/loginModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from 'validator'


//login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await loginModel.findOne({email})

        if (!user){
            return res.json({success:false,message:"user does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWt_SECRET)
}
//register user
const registerUser =async (req, res)=>{
    const {name,password,email} = req.body
    try{
        // check if user already exists
        const exists = await loginModel.findOne({email})
        if (exists){
            return res.json({success:false,message:"User alerady exists"})
        }

        // validating email formate & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter valid user"})
        }

        if (password.length<8){
            return res.json({success:false,message:"please enter strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new loginModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
           

    } catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
        

    }

}

export {loginUser, registerUser}