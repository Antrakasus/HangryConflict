var can, c2;
var todraw = [];
var entities = [];


var fill = 0.8;
var ratio = 16/9;
var atans = [Math.atan, atan, atane]

class entity{
    constructor(){

    }
    step(){

    }
}

class tri{
    constructor(p1,p2,p3,c,parent){
        this.p1=p1;
        this.p2=p2;
        this.p3=p3;
        this.c=c;
        this.parent=parent;
    }
}

class point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

class obj{
    constructor(){
        this.x=this.y=this.xs=this.ys=0;
        this.body=[];
    }
    step(){
        
    }
}
function resize(){
    if(innerHeight*ratio>innerWidth){
        can.width = innerWidth*fill;
        can.height = can.width/ratio;
        
    }else{
        can.height = innerHeight*fill;
        can.width = can.height*ratio;
    }
    
}

function load(){
    can = document.getElementById("can't");
    c2=can.getContext("2d")
    window.onresize = resize;
    resize();
}

function stepy(){
    for(let n=0;n<todraw.length;n++){
        todraw[n].stepy()
    }
}

function draw(){
    c2.clearRect(0,0,can.width,can.height);
    for(let n=0; n<todraw.length; n++){
        let dr= todraw[n]
        let bod= dr.body;
        for(let z=0; z<bod.length;z++){
            let tr= bod[z];
            c2.beginPath();
            c2.moveTo(tr.p1.x+dr.x,tr.p1.y+dr.y);
            c2.lineTo(tr.p2.x+dr.x,tr.p2.y+dr.y);
            c2.lineTo(tr.p3.x+dr.x,tr.p3.y+dr.y);
            c2.fillStyle=tr.c;
            c2.fill()
        } 
    }
}

function frame(){
    draw();
    stepy();
    requestAnimationFrame(frame);
}
a=new obj();
a.body[0]=new tri(new point(100,200),new point(200,100),new point(100,100),"#00ffff",a);
todraw[0]=a;