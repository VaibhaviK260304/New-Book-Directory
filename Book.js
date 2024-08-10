import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  name: 
  {
    type: String,
    required: true
  },
  author: 
  {
    type: String,
    required: true
  },
  description: 
  {
    type: String,
    required: true
  },
  price: 
  {
    type: Number,
    required: true
  },
  image: 
  { 
    type: String, 
    required: true
  },
  available: 
  {
    type: Boolean
  }
});

const Book = model("books", bookSchema)
export default Book