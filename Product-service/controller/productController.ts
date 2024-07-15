import express,{Request, Response} from 'express'
import { Product } from '../model/productModel'


export const createProduct= async (req: Request, res: Response)=>{
    try{
        const {productName, category, price}= req.body;
        const newProduct= new Product({productName,category,price});

        const savedProduct= await newProduct.save()
        res.status(201).json(savedProduct);
    }catch(err){
        res.status(500).json({err: 'Internal server error'})
        console.log('Error creating product:', err);   
    }
};


export const getProducts= async(req: Request, res:Response)=>{
    try{
        const products= await Product.find({})
        res.json(products)
    }catch(error){
        console.log(error);
    }
}