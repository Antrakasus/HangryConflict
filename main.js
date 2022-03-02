const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
var jParser = bodyParser.json();
var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'scripts')));
app.use("/", angy);

var listener = app.listen(process.env.PORT || 8080);
console.log("Listening on port "+listener.address().port);
function angy(req, res, next){
    console.log("Request at: "+req.path+" with body of "+req.body);
    if(req.method=="GET"){       
        if(req.path=="/"){
            res.render("index")
        }else if(!req.path.includes(".")){
            res.render(req.path.substring(1))
        }else{
            if(req.path=="favicon.ico"){
                console.log("fav")
                res.sendFile("faviconico");
            }
            res.sendFile(__dirname+req.path);
        }
    }else if(req.method=="POST"){
        want(req, res, next)
    } 
}

function want(req, res, next){
    console.log(req.body);
    if(req.body !==undefined){
        console.log(req.body.want);
        if(req.body.want=="ip"){
            console.log(req.ip+" wanted their ip");
            res.set("Content-Type", "text/plain;charset=utf-8");
            res.send(req.ip);
        }
        
    }
    
}