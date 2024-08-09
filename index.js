import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { getAllBooks, addbook } from './controllers/book.js'; // Ensure the correct function name
// import Books from "./model/Book.js";

const app = express();
app.use(express.json());
app.use(cors());

// Middlewares
app.get('/books', getAllBooks);
app.post('/book', addbook);

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        if (connect) {
            console.log('MongoDB connected');
        }
    } catch (err) {
        console.log(err);
    }
};
connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
