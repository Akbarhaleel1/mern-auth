import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'; 
dotenv.config();
const app = express();


app.use(cors());


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connect to mongoDB');
})


app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})


app.use('/api/user',userRoutes)

app.use('/api/auth',authRoutes)

app.use('/api/admin',adminRoutes)


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server err';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})