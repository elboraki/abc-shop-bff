import express from 'express';


const app = express();
const PORT = 3000;

app.use(function(req,res,next){
 console.log("middlware");
 next();
})

const invoices=[
    {id:1,item:"Google X1",qte:4,date:new Date()},
    {id:2,item:"Amazon Lambda",qte:3,date:new Date()},
    {id:9,item:"Microsoft E1",qte:8,date:new Date()}
]

app.get("/invoices",(req,res)=>{
    res.json(invoices)
})
app.get("/", (req, res) => {
    res.json({
        msg: "Welcome Younes How are you!"
    })
})

app.listen(PORT, () => {
    console.log("server is runining ", PORT);
})