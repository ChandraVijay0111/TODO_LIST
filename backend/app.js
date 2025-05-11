const express = require("express");
const app=express();
const cors =require('cors');
app.use(cors({origin: 'http://localhost:3000'}));
require("./conn/conn");
const auth =require("./routes/auth");
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("working");
})
app.use("/api/v1",auth);
app.listen(1000,()=>{
    console.log("listening");
})