const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");
var dir = process.cwd();
var jParser = bodyParser.json();
var app = express();
var list= fs.readFileSync(dir+"/list.txt", "utf-8",function(err,data){return data;})
var def =fs.readFileSync(dir+"/defaults.txt","utf-8",function(err,data){return data;});
def = def.split(/(start|end)/);
var gams =fs.readFileSync(dir+"/game.txt","utf-8",function(err,data){return data;});
gams = gams.split(/(\/|\r\n)/).filter(function(d,i){return i%2==0});
var all = def[def.indexOf("all")+3];
app.disable('x-powered-by');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'scripts')));
app.use("/", angy);

var listener = app.listen(process.env.PORT || 8080);

function defaults(reg){
    reg = reg.substr(0,8+reg.indexOf("</title>"))+all+reg.substr(8+reg.indexOf("</title>"))
    if(reg.includes("Thingoids:")){
        let stuffs="";
        for(let i=0; i<gams.length;i+=2){
            if(i%4==0){stuffs+="<br>"}
            stuffs+="<a class=chill href=\""+gams[i+1]+"\">"+gams[i]+"</a>";
        }
        reg = reg.substr(0,15+reg.indexOf("Thingoids:"))+stuffs+reg.substr(15+reg.indexOf("Thingoids:"))
    }
    return reg;
}
function angy(req, res, next){
    let out;
    let path = req.path;
    sp=path.split("/");
    if(req.method=="GET"){
        if(!path.includes(".")){
            if(!list.includes(sp[sp.length-1])){
                out= fs.readFileSync(dir+"/views/fun.ejs","utf-8",function(err,data){
                    return data;
                });
                res.setHeader("Content-type","text/html");
                res.send(defaults(out));
            }else if(path=="/"){path = "/index";}
                out = fs.readFileSync(dir+"/views"+path+".ejs","utf-8",function(err,data){
                    if(err){
                        return fs.readFileSync(dir+"/views/err.ejs");
                    }else{
                        return data;
                    }
                })
            /*
            switch(path.split(".")[path.split(".").length-1]){
                case "ejs":
                    res.setHeader("Content-type","text/html");
                    break;
                case "css":
                    res.setHeader("Content-type","text/css");
                    break;
                case "js":
                    res.setHeader("Content-type","text/javascript");
                    break;
            }*/
            res.setHeader("Content-type","text/html");
            res.send(defaults(out));
        }else{
            if(path=="favicon.ico"){
                res.sendFile("favicon.ico");
            }
            res.sendFile(__dirname+req.path);
        }
    }else if(req.method=="POST"){
        want(req, res, next)
    } 
}

function want(req, res, next){
    if(req.body !==undefined){
        if(req.body.want=="ip"){
            res.set("Content-Type", "text/plain;charset=utf-8");
            res.send(req.ip);
        }
        
    }
    
}