import { Request,Response } from "express";
import {Cart} from '../model/cartModel';
import { log } from "console";

export const createCart= async(id:string)=>{
    try{
        console.log(id,'UserID cart l und');
        const existingCart= await Cart.findOne({user:id});
        if(!existingCart){
            const newCart= new Cart({ userId:id, items:[]});
            await newCart.save();
            console.log('cart created');
        }   
    }catch(err){
        console.log(err);
    }
}


export const addToCart= async (req: Request, res: Response)=>{
    try{
        const {id,productId,productName,category,price}= req.body;
        const cart= await Cart.findOne({userId:id})

        if(!cart){
            return res.status(404).json({error: 'Cart not found for the user'})
        }

        cart.products.push({productId, productName, category, price})

        await cart.save();
        console.log("cart l saved");
        res.status(200).json({message: 'Product added to the cart Successfully'})
    }catch(err){
        console.error('Error while adding product to Cart',err);
        res.status(500).json({error:'Internal server error'});
    }
};


export const getCart = async (req: Request, res: Response) => {
    console.log("eda mone!");
    
    try {
        console.log("vannu");
        
        const id = req.params.id;
        console.log(id, "getting or not");
        const cartData = await Cart.findOne({ userId: id });

        if (cartData) {
            const products = (cartData as any).products; 
            res.json({ products });
        } else {
            res.json({ products: [] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}