import express from "express";
import cors from 'cors'
import router from './route/productRoute'

const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/product', router)

const PORT= 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
