import { error } from "console";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
      }
    ]
  });

  export const Cart= mongoose.model('Cart', cartSchema);

  mongoose.connect('mongodb://localhost:27017/KafkaEcom_CartService')
  .then(()=> console.log('MongoDB connected'))
  .catch((error)=> console.error('Error while connecting to MongoDB'))