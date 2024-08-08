import {Schema, model} from "mongoose"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,               //data modeling
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },    
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
},{
        timestamps: true
});

const Book = model("Book", bookSchema);

export default Book;


//module.export = mongoose.model("Book", bookSchema);