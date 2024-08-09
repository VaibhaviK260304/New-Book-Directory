import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { addbooks, getAllBooks, getById, updateBook, deleteBook } from './controllers/book.js';

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
    console.log(`Server is running on http://localhost:${PORT}`);
});