ipp = document.getElementById("ipp")
function response(){
    if(this.readyState == XMLHttpRequest.DONE && this.status === 200)
    ipp.innerHTML = "Your ip is: "+this.responeText;
}
req = new XMLHttpRequest();
req.onreadystatechange(response)
req.open("POST", "https://www.hangryconflict.heroku.com");
req.send("want=ip")