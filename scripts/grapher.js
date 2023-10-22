var stan ="function fun(x)\n{\nreturn Math.sin(x)\n}";
var can, ctx, ins, tex, vals, minx, maxx, miny, maxy, step, pars, bod, fun, scale, pres, path, power, playing, ac, buffer, gain, cd, sauce, pGainC, volume, pitch, segtime;
function load(){
    can = document.getElementById("can't");
    ctx = can.getContext("2d");
    pres = 2;
    power = 5;
    ins = document.getElementById("ins").children[0].children;
    tex = document.getElementsByTagName("textarea")[0];
    tex.value=stan;
    volume=ins[9].value;
    pitch=ins[12].value;
    segtime=ins[15].value/1000;
    ac = new AudioContext();
    buffer = ac.createBuffer(1,ac.sampleRate*segtime,ac.sampleRate);
    cd = buffer.getChannelData(0);
    sauce = ac.createBufferSource();
    sauce.loop=true;
    sauce.buffer=buffer;
    pGainC = ac.createGain();
    pGainC.connect(ac.destination);
    compile();
    genSound();
}

function logn(val, n){
    return Math.log(val)/Math.log(n)
}

function compile(){
    let inv = invalid();
    if(inv){
        alert(inv)
        return;
    }
    graph();
}

function genSound(){
    volume=ins[9].value;
    pitch=ins[12].value;
    segtime=ins[15].value/1000;
    for(let i=0;i<buffer.length*step;i++){
        //cd[i]=fun(i/pitch/step)
        cd[i]=Math.random()*2-1
    }
    
} 

function play(){
    if(playing){
        playing=false;
        ins[18].textContent="Play";
        sauce.stop();
    }else{
        sauce = ac.createBufferSource();
        sauce.loop=true;
        sauce.buffer=buffer;
        sauce.connect(pGainC);
        pGainC = ac.createGain();
        pGainC.connect(ac.destination);
        pGainC.gain.setValueAtTime(volume/1000,0);
        playing=true;
        ins[15].textContent="Stop";
        sauce.start();
    }
    
}

function invalid(){
    let cont = tex.value;
    bl.forEach(element => {
        if(cont.includes(element)){
            return "Stahp XSS";
        }
    });
    if(!cont.includes("function fun(")){
        return "Fix code";
    }
    pars=cont.substr(13, cont.indexOf(")")-13).split(", ");
    bod=cont.substr(cont.indexOf("{"));
    let depth=1;
    for(let i = 0;i<=bod.length;i++){
        if(bod[i]=="{"){
            depth++;
        }else if(bod[i]=="}"){
            depth--;
        }
        if(depth==0){
            bod=bod.substr(0,i);
            break;
        }
    }
    fun=new Function(...pars,bod);
    return false;
}

function slide(){
    ins[0].value=ins[1].value;
    ins[3].value=ins[4].value;
    ins[6].value=ins[7].value;
    ins[9].value=ins[10].value;
    ins[12].value=ins[13].value;
    ins[15].value=ins[16].value;
    graph();
    genSound()
}

function click(){
    ins[1].value=ins[0].value;
    ins[4].value=ins[3].value;
    ins[7].value=ins[6].value;
    ins[10].value=ins[9].value;
    ins[13].value=ins[12].value;
    ins[16].value=ins[15].value;
    graph();
    genSound()
}

function graph(){
    ctx.clearRect(0,0,can.width,can.height)
    minx=parseFloat(ins[0].value);
    maxx=parseFloat(ins[3].value);
    step=parseFloat(ins[6].value);
    vals = new Array(Math.floor(step));
    for(let i=0;i<=step;i++){
        vals[i]=fun(i/step*(maxx-minx))
    }
    maxy = Math.max(...vals);
    miny = Math.min(...vals);
    path = new Path2D();
    path.moveTo(20,mapb(vals[0],miny,maxy,20,can.height-20))
    for(let i=1;i<=step;i++){
        path.lineTo(mapb(i,0,step,20,can.width-20),mapb(vals[i],miny,maxy,can.height-20,20));
    }
    ctx.strokeStyle="#000"
    ctx.stroke(path);
    
    ctx.font = "10px Helvetica";
    scale = Math.floor(Math.pow(power,Math.floor(logn((maxy-miny),power)))/pres)
    for(let i = -((maxy-miny)-(maxy-miny)%scale); i<=((maxy-miny)-(maxy-miny)%scale)*2;i+=scale*0.5){
        path.moveTo(20,mapb(i,miny,maxy,can.height-20,20))
        path.lineTo(can.width-20,mapb(i,miny,maxy,can.height-20,20))
        ctx.fillText(i,10,mapb(i,miny,maxy,can.height-20,20))
    }
    ctx.strokeStyle="#999"
    ctx.stroke(path);
}