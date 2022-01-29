var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", angy);

app.listen(process.env.PORT || 5000)
console.log("Listening")

function angy(req, res){
    if(req.method=="POST"){
        res = req.ip;
    }else if(req.method=="GET"){
        if(req.path=="/"){
            res.render("index")
        }
        else if(req.body.want=="ip"){
            res.set("Content-Type", "text/plain")
            res.send(req.ip)
        }
        else{
            res.sendFile(req.path)
        }
    }
    console.log(req.path)
}