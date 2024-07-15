import mongoose from "mongoose";

const productModeSchema= new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

export const Product= mongoose.model('Product', productModeSchema);

mongoose.connect('mongodb://localhost:27017/KafkaEcom_productService')
.then(()=> console.log('MongoDB connected'))
.catch((err)=> console.error('Error while connecting to MongoDB',err))
