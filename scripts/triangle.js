var can, ctx,
objects = [],
toDraw = [],
fr = 60,
time = performance.now(),
frametimer = performance.now(),
frametimes = 0,
frametime = 0,
fps = 0,
delta = 0,
vframetime = 0,
vfps = 0,
frames = 0,
clear = true,
debug = [];


var aspect = 16/9;
var heightmul = 0.9;
var widthmul = 0.9;
var polerate = 0.5;
var bounce = 1.1;
var sidefrick = 1;
var sped = 1;
var frick = 1;
var maxV

class object{
    constructor(){
        this.body = [];
        this.x = can.width/2;
        this.y = can.height/2;
        this.xs = 0;
        this.ys = 0;
        toDraw.push(this.body);
    }
    step(){
        this.x += this.xs*delta;
        this.y += this.ys*delta;
        this.xs *= 1-frick/1000;
        this.ys *= 1-frick/1000;
        if(this.x<20||this.x>can.width-20){
            this.xs *= bounce;
            this.ys *= sidefrick;
            if(this.x<20){
                this.x = 20;
            }else{
                this.x = can.width-20;
            }
        }
        if(this.y<20||this.y>can.height-20){
            this.ys *= bounce;
            this.xs *= sidefrick;
            if(this.y<20){
                this.y = 20;
            }else{
                this.y = can.height-20;
            }
        }
        this.body.forEach(function(tri,i){
            tri.p1.x = this.x+tri.p1.ox;
            tri.p1.y = this.y+tri.p1.oy;
            tri.p2.x = this.x+tri.p2.ox;
            tri.p2.y = this.y+tri.p2.oy;
            tri.p3.x = this.x+tri.p3.ox;
            tri.p3.y = this.y+tri.p3.oy;
        },this)
        if(Math.abs(this.xs)>maxV){
            this.xs *=0.05;
        }
        if(Math.abs(this.ys)>maxV){
            this.ys *=0.05;
        }
    }

    click(){
        this.body.forEach(function(tri){
            tri.color = "rgb("+
            Math.random()*255+","+
            Math.random()*255+","+
            Math.random()*255+",0.2)";
        }) 
    }

    clickCheck(p){
        this.body.forEach(function(tri){
            if(inTriangle(p,tri.p1,tri.p2,tri.p3)){
                this.click()
            }
        },this)
        
    }

}

class point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class mpoint{
    constructor(ox, oy) {
        this.x = 0;
        this.y = 0;
        this.ox = ox;
        this.oy = oy;
    }
}

class tri{
    constructor(p1,p2,p3,color){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.color = color
    }
}

function correctSize(){
    if(window.innerWidth<window.innerHeight*aspect){
        can.width = window.innerWidth*widthmul;
        can.height = can.width*(1/aspect);
    }else{
        can.height = window.innerHeight*heightmul;
        can.width = can.height*aspect
    }
    lefty = can.offsetLeft + can.clientLeft;
    topside = can.offsetTop + can.clientTop;
}


function load(){
    can = document.getElementById("can't");
    can.addEventListener('click', function(event) {
        let x = event.pageX - lefty,
            y = event.pageY - topside;
        objects.forEach(function(element) {
            element.clickCheck(new point(x,y));
        });
    
    }, false);
    correctSize();
    if (can.getContext) {
        ctx = can.getContext('2d');
        window.onresize = correctSize;
        }else{
        can.innerHTML = "Your device can't support canvases, broke boi";
    }
    frame();
}

function buildthing(){
    let thing = new object();
    thing.body[0] = new tri(
        new mpoint(25,25),
        new mpoint(-25,25),
        new mpoint(0,-25),
        "rgb("+
        Math.random()*255+","+
        Math.random()*255+","+
        Math.random()*255+",0.2)");
    
    thing.xs = (Math.random()-0.5)*sped;
    thing.ys = (Math.random()-0.5)*sped;

    objects.push(thing);
}

function frame(){
    delta = performance.now() - time;
    time = performance.now();
    if(performance.now()-frametimer>1000/polerate){
        vfps = frames*polerate-polerate;
        vframetime = frametimes/frames;
        frames = frametimes = 0;
        frametimer=performance.now();
    }
    fps *= 0.98;
    fps += 20/Math.max(delta,0.1);
    for(i=0;i<objects.length;i++){
        objects[i].step();
    }
    draw();
    frames++;
    window.requestAnimationFrame(frame); 
}

function draw(){
    if(clear){
        ctx.clearRect(0, 0, can.width, can.height)
    }
    objects.forEach(function(sh,i){
        sh.body.forEach(function(tri,x){
            ctx.fillStyle = tri.color;
            ctx.beginPath();
            ctx.moveTo(tri.p1.x, tri.p1.y);
            ctx.lineTo(tri.p2.x, tri.p2.y);
            ctx.lineTo(tri.p3.x, tri.p3.y);
            ctx.closePath();
            ctx.fill();
        })
    })
    
    frametime *= 0.95;
    frametime += Math.max(0.1, performance.now()-time)/20;
    frametimes += performance.now()-time;
    for(let y= 0; y<Math.pow(Math.max(10-frametime,0),2);y++){
        buildthing();
    }
    ctx.font = "20px Verdana";
    ctx.fillStyle = "rgb(0,0,255,0.8)";
    ctx.fillText("Frametime: "+Math.round(vframetime), 10, 30);
    ctx.fillText("Fps: "+Math.round(vfps), 10, 50);
    ctx.fillText("Things: "+toDraw.length, 10, 70);
    debug.forEach(function(de,i){
        ctx.fillText("Debug: "+de, 10, i*20+70);
    })
    
}
