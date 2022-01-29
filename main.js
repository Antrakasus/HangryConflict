var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("index")
});

app.listen(8080)
console.log("Listening")

function angy(){
    alert("Hangry")
}