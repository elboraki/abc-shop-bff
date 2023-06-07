import express from 'express';


const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        msg: "Welcome Younes How are you!"
    })
})

app.listen(PORT, () => {
    console.log("server is runining ", PORT);
})