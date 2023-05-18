const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")
   
})

app.post("/",function(req,res){
   
   const appkey="5915a8349c91c14a28f2c666cddf13f3";
   const city=req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+appkey+"&q="+city;
https.get(url , function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherdesp=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const iconUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        
   res.write("<h1>current temperature of "+ city+" is "+temp+"</h1>")
  res.write("<p> temperature in "+city +" is "+weatherdesp+"</p>") 
  res.write("<img src="+iconUrl+">")       
    })
});

   
})






app.listen(3000, function(){
    console.log("server started successfully");
})