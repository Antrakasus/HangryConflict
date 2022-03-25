var stan ="function fun(x)\n{\nreturn Math.sin(x)\n}";
var can, ctx, ins, tex, vals, minx, maxx, miny, maxy, step, pars, bod, fun;
var path;
function load(){
    can = document.getElementById("can't");
    ctx = can.getContext("2d");

    ins = document.getElementById("ins").children[0].children;
    tex = document.getElementsByTagName("textarea")[0];
    tex.value=stan;
    click();
}

function invalid(){
    let cont = tex.value;
    bl.forEach(element => {
        if(cont.includes(element)){
            return "Stahp XSS";
        }
    });
    if(cont.substr(0,13)!="function fun("){
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
    graph();
}

function click(){
    ins[1].value=ins[0].value;
    ins[4].value=ins[3].value;
    ins[7].value=ins[6].value;
    graph();
}

function graph(){
    ctx.clearRect(0,0,can.width,can.height)
    let inv = invalid();
    if(inv){
        alert(inv)
        return;
    }
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
    path.moveTo(20,mapb(0,miny,maxy,can.height-20,20))
    path.lineTo(can.width-20,mapb(0,miny,maxy,can.height-20,20))
    let line = Math.pow(10,Math.floor(Math.log10((maxy-miny)*0.5)))
    path.moveTo(20,mapb(line,miny,maxy,can.height-20,20))
    path.lineTo(can.width-20,mapb(line,miny,maxy,can.height-20,20))
    ctx.font = "10px Helvetica";
    ctx.fillText("0",10,mapb(0,miny,maxy,can.height-20,20))
    ctx.fillText(line,10,mapb(line,miny,maxy,can.height-20,20))
    ctx.strokeStyle="#999"
    ctx.stroke(path);
}