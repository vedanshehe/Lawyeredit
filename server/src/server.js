import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDB from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import replyRoutes from './routes/replyRoutes.js';
import errorMiddleware from './middlewares/errormiddleware.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/replies", replyRoutes);

 app.get('/',(req,res)=>{
     res.send('Hello World!');
 })

//error middleware 
app.use(errorMiddleware);

   await connectDB();
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
