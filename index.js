//mpgrEIOTivIVFgfv
import express from 'express'
import mongoose, { Mongoose } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//connection to mongodb
// mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connected to mongoDB")).then(()=>{app.listen(5000);}).catch((err)=>console.log(err));

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URL,)
    if(connect){
        console.log('MongoDB connected')
    }
};
connectDB();

app.get('/', (req, res)=>{
    res.json({
        message: 'Welcome to expense tracker'
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})