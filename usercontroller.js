import User from "../models/usermodel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken =(userID)=>{
    return jwt.sign({id:userID},process.env.JWT_SECRET,{expiresIn:"30d"})
}


export const registerUser = async (req,res) => {
    try{
        const {name,email,password} = req.body
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"user already exists"})
        }
        if(password.length<8){
            return res.status(400).json({success:false,message:"password mut be alteast 8 characters"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,
            password:hashedpassword
        })
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    catch(error){
        res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
    
}

export const loginUser= async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(500).json({message:"invalid email or password"})

        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).json({message:"invaild email or password"})
        }
         res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    catch(error){
         res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
}


export const getuserprofile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.json(user)
    }
    catch(error){
        res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
    
}