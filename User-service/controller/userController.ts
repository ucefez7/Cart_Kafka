import {Request, Response} from 'express'
import {User} from '../model/userModel';
import {sendMessageToKafka} from '../kafka/producer'

export const user= async (req: Request, res: Response)=>{
    
    try{
        
        const{email, password}= req.body;
        const exists= await User.findOne({email})
        // console.log(req.body);
        if(!exists){
            const newUser= new User({email, password});
            const savedUser= await newUser.save();
console.log(savedUser._id);

            await sendMessageToKafka('user-created-topic',{userId: savedUser._id});
            res.status(200).json({id: savedUser._id});
        }else{
            await sendMessageToKafka('user-created-topic',{userId: exists._id});
            res.status(200).json({id: exists._id});
        }
        
    }catch(error){
        res.status(404).json(error);
        console.log(error);
    }
}