var ipp = document.getElementById("ipp");
var req = new XMLHttpRequest();
function response(){
    console.log(req.status);
    console.log(req.responseText);
    if(req.status==4){
        ipp.innerHTML = "Your ip is: "+req.responseText.split(":")[3];
    }

}
req.onload=response();
function send(){
    req.open("POST", window.location);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    req.send(JSON.stringify({"want":"ip"}))
}