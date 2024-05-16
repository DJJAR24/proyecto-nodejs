import express from 'express';
import fs from "fs";
const app=express();
app.listen(3000, ()=> {
    console.log("servidor corriendo");
});

const redData =()=>{
    const data =fs.readFileSinc("data.json")
}
//getpoint
app.get("/", (req,res)=>{
res.send("welcome my first api")
});