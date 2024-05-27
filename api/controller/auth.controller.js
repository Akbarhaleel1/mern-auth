import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'

// export const signup = async (req, res,next) => {
//     const { username, email, password } = req.body;
//     const hashPassword =  bcryptjs.hashSync(password,10)
//     // Basic validation
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }
  
//     try {
//       // Attempt to create a new user
//       const newUser = new User({ username, email, password:hashPassword });
//       await newUser.save();
//       res.status(201).json({ message: "User created successfully" });
//     } catch (err) {
//         next(err)
//     }
//   };


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashPassword = bcryptjs.hashSync(password, 10);

    // Attempt to create a new user
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '7d' });

    // Set the JWT token as a cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};


  // export const signin =async (req,res,next) =>{
  //   const {email,password} = req.body;
  //   try {
  //     const validUser = await User.findOne({email});
  //     if(!validUser)return next(errorHandler(404,'User not found'));
  //     const validPassword = await User.findOne({password})
  //     if(!validPassword) return next(errorHandler(401,'wrong credential'))
  //     const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
  //     const {password:hashPassword,...rest} = validUser._doc;
  //     const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  //     res
  //     .cookie('access_token',token,{httpOnly:true,maxAge:maxAge})
  //     .status(200)
  //     .json(rest);
  //   } catch (error) {
  //      next(error);
  //   }
  // }


  export const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(errorHandler(400, 'Email and password are required'));
    }
  
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found'));
  
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));
  
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      const { password: hashPassword, ...rest } = validUser._doc;
  
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      res
        .cookie('access_token', token, { httpOnly: true, maxAge: maxAge })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };



export const google = async(req,res,next)=>{
  try {
    const user = await User.findOne({email:req.body.email})
    if(user){
      const token = jwt.sign({id:user.id}, process.env.JWT_SECRET);
      const {password:hashPassword,...rest} = user._doc;
      const expiryDate = new Date(Date.now()+3600000);
      res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
    }else{
       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
       const hashPassword = bcryptjs.hashSync(generatedPassword,10);
       const newUser = new User({username:req.body.name.split(' ').join('').toLowerCase()+Math.floor(Math.random() * 10000),email:req.body.email,password: hashPassword,profilePicture:req.body.photo});
       await newUser.save();
       const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
       const {password:hashPassword2,...rest} = newUser._doc;
       const expiryDate = new Date(Date.now()+3600000);
       res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
    }
  } catch (error) {
    next(error)
  }
}


export const signout = (req,res) =>{
  res.clearCookie('access_token').status(200).json('SignOut success!')
}