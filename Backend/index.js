import express from 'express';
import { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import User from "./model/User.js"
import { getAllBooks, addbooks, getById, updateBook, deleteBook } from './controllers/book.js';

const app = express();
app.use(express.json());
app.use(cors());

// Middlewares
app.get('/', ((req, res) => {
    res.send('Server is perfect');
}))
app.get('/books', getAllBooks);
app.post('/book', addbooks);
app.get('/book/:id', getById);
app.put('/book/:id', updateBook);
app.delete('/book/:id', deleteBook);

app.post('/signup',async (req, res)=>{
    const {name, email, password, dob} = req.body;
    const user = new User({
        name, 
        email, 
        password, 
        dob: new Date(dob)
    });
    try {
    const savedUser = await user.save();
    res.json({
        success: true,
        message: 'User created successfully',
        user: savedUser
    })
    }
    catch(e){
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }

})
app.post('/login',(req, res)=>{
    const {email, password} = req.body;

})


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        if (connect) {
            console.log('MongoDB connected');
            // console.log(process.env.MONGO_URL);
        }
    } catch (err) {
        console.log(err);
    }
};
connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ success: false, message: 'Invalid JSON' });
    }
    next();
});