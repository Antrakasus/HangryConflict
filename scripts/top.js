var buttons = [];
function setup(){   
    document.body.addEventListener("click",function(event){
            let els = document.elementsFromPoint(event.clientX,event.clientY);
            for(let i =0;i<els.length;i++){
                let element = els[i];
                if(!element.parentElement){
                    continue;
                }
                if(element.parentElement.className.baseVal=="drop"){
                    if(element.style.transform!="rotatez(45deg)"){
                        element.style.transform = "rotatez(45deg)";
                    }else{
                        element.style.transform = "rotatez(0deg)"
                    }
                }
            };
    })
        
}
document.body.onload = setup;