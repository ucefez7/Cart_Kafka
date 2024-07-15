import express from "express";
import cors from "cors";
import router from './route/cartRoute';
import {initConsumer} from './kafka/consumer';
import { error, log } from "console";

const app= express()
const PORT= 3003;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/cart',router);

//Initialize kafka consumer here
initConsumer().then(()=>{
    console.log('Kafka consumer Initialized!');
})
.catch((error)=>{
    console.error('Failed to Initailize Kafka consumer', error);
})
.finally(()=>{
    //start the server without considering the status os consumer initialization
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
});
