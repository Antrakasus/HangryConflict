var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.all("/", angy);

app.listen(process.env.PORT || 5000)
console.log("Listening")

function angy(req, res){
    if(req.method=="POST"){
        res = req.ip;
    }
    if(req.method=="GET"){
        res.render("index");
    }
    console.log(req.path)
}