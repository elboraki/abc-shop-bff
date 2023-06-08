import express from 'express';
import { router } from './config/routes';


const app = express();
const PORT = 3000;
app.use("/api",router)
app.use(function(req,res,next){
 console.log("middlware");
 next();
})




app.listen(PORT, () => {
    console.log("server is runining ", PORT);
})