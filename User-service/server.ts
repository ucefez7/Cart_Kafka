import express from 'express';
import cors from 'cors'
import router from './route/userRoute'

const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/user', router)

const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);   
});