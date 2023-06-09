import express from 'express';
import { router } from './config/routes';
import mongoose from 'mongoose';
import logger from 'morgan'
mongoose.Promise=global.Promise
mongoose.connect("mongodb://localhost/invoice-builder")
const app = express();
const PORT = 3000;



app.use(express.json())
app.use(express.urlencoded())
app.use(logger('combined'))
app.use("/api",router)

app.use((req,res,next)=>{

    const error=new Error();
    error.status=400;
    error.message="Customer Error";
    next(error);


})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    return res.json({
        error:{
            msg:error.message
        }
    })
})




app.listen(PORT, () => {
    console.log("server is runining ", PORT);
})