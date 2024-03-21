import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import connectToMongo from './db/conn.js';
import { app,server } from './socket/socket.js';
dotenv.config();
const PORT=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes)
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectToMongo();
})