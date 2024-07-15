import mongoose from "mongoose";

const userModelSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

export const User= mongoose.model('User', userModelSchema);

mongoose.connect('mongodb://localhost:27017/KafkaEcom_userService')
.then(()=>console.log('MongoDB connected'))
.catch((error)=> console.error('MongoDB connection Error:',error));