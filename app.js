const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.get("/speedforces",function(req,res){
    res.sendFile(__dirname+"/public/speedforces.html");
})

app.get("/code_battle",function(req,res){
    res.sendFile(__dirname+"/public/code_battle.html");
})


app.listen(process.env.PORT || 3000,function(req,res){
//console.log("server is running");
});