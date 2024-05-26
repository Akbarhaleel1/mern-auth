import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashPassword =  bcryptjs.hashSync(password,10)
    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      // Attempt to create a new user
      const newUser = new User({ username, email, password:hashPassword });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        next(err)
    }
  };