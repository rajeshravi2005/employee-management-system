const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("welcome to simplelearn");
    res.send("hello ji");
});
app.listen(4000,()=>{
    console.log("listenening to the port 3000");
});