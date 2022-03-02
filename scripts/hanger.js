var can;
var ctx;
var objects = [];
var toDraw = [];
var fr = 60;
var heightmul = 0.8;
var widthmul = 0.8;
var time = performance.now();
var frametime = 0;
var clear = true;
delta = fps = 0;

class object{
    constructor(){
        this.body = new shape("rgb(0,0,0,0)",true,
        new point(10,-10), new point(0,10), new point(-10,-10))
        this.x = 100;
        this.y = 100;
        this.xs = 0;
        this.ys = 0;
        toDraw.push(this.body);
    }
    step(){
        this.x += this.xs;
        this.y += this.ys;
        if(this.x<20||this.x>can.width-20){
            this.xs *=-1;
            if(this.x<20){
                this.x = 20;
            }else{
                this.x = can.width-20;
            }
        }
        if(this.y<20||this.y>can.height-20){
            this.ys *=-1;
            if(this.y<20){
                this.y = 20;
            }else{
                this.y = can.height-20;
            }
        }
        for(let x=0;x<this.body.points.length;x++){
            let spot = this.body.points[x];
            spot.x = this.x+spot.ox;
            spot.y = this.y+spot.oy;
        }
    }

}

class point{
    constructor(ox, oy) {
        this.x = 0;
        this.y = 0;
        this.ox = ox;
        this.oy = oy;
    }
}

class shape{
    constructor(color, filled, ...args) {
        this.color = color;
        this.filled = filled;
        this.points = args;
    }
}

function load(){
    can = document.getElementById("can't");
    can.width = window.innerWidth*widthmul;
    can.height = window.innerHeight*heightmul;
    if (can.getContext) {
        ctx = can.getContext('2d');
        stuff();
        }else{
        can.innerHTML = "Your device can't support canvases, broke boi";
    }

    function stuff(){
        window.onresize = function(){
        can.width = window.innerWidth*widthmul;
        can.height = window.innerHeight*heightmul}
        window.requestAnimationFrame(frame);
    }
}

function buildthing(){
    let thing = new object();
    thing.xs = (Math.random()-0.5)*10;
    thing.ys = (Math.random()-0.5)*10;
    thing.body.color = "rgb("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+",0.2)";
    objects[i] = thing;
}

function frame(){
    delta = performance.now() - time;
    time = performance.now();
    fps *= 0.95;
    fps += 50/Math.max(delta,0.1);
    for(i=0;i<objects.length;i++){
        objects[i].step();
    }
    draw();
    window.requestAnimationFrame(frame); 
}

function draw(){
    if(clear){
        ctx.clearRect(0, 0, can.width, can.height)
    }
    
    for(let i=0; i<toDraw.length;i++){
        let sh = toDraw[i];
        ctx.beginPath();
        ctx.fillStyle = sh.color;
        ctx.moveTo(sh.points[0].x, sh.points[0].y);
        for(let x=1; x<sh.points.length;x++){
            ctx.lineTo(sh.points[x].x, sh.points[x].y);
        }
        ctx.closePath();
        if(sh.filled){
            ctx.fill();
        }else{  
            ctx.stroke();
        }
    }
    frametime = performance.now()-time
    for(let y= 0; y<(10-frametime)*10;y++){
        buildthing();
    }
    ctx.font = "20px Verdana";
    ctx.fillStyle = "rgb(0,0,255,0.8)";
    ctx.fillText("Frametime: "+frametime, 10, 20);
    ctx.fillText("Fps: "+Math.round(fps), 10, 40);
    ctx.fillText("Things: "+toDraw.length, 10, 60);
}
