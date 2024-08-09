//mpgrEIOTivIVFgfv
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import {getBook} from "./routes/book-routes.js"

const app = express();
app.use(express.json());
app.use(cors());

//middlewares
app.get("/books", getBook);

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    try{
 
    if(connect){
        console.log('MongoDB connected')
               
    }
    }
    catch(err){
        console.log(err);
    }
};
connectDB();


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})