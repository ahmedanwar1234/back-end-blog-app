import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import {my_name}from './data.js'
import path, {dirname}from 'path'
import connectDB from './config/db.js'
import {erroresponserHandler,invalidPathHandle} from './middleware/errorHandler.js'
import { authGaurd } from './middleware/authMiddleware.js'
import { fileURLToPath } from 'url';
import cors from 'cors'

console.log(Array.from('anwar'),(value,index)=>{
   return index+start
});

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config()
connectDB()
const app=express()
//Middle Ware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
;
// Routes
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import createRoutes from './routes/commentRoutes.js'
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/comments',createRoutes);
;
app.get('/',(req,res)=>{
    res.send('hello fucker mother');
});
;
;
;
// static assets
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use(invalidPathHandle)
app.use(erroresponserHandler)
;
;
const port=process.env.PORT ||5000;
app.listen(port,()=>{
    console.log(`listen is running in localhost:${port}`)
})


