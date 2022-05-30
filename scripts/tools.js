const letters = "!#$%&'()*+,-./;<=>?@[\]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz½´¨§öÖäÄåÅ¦¥¤£¢¡©Øç";
const bl ="document".split(" ");
var odds = [];
for(let i = 0; i<100; i++){
    odds[i]=1/(i*2+1)
}
function mapb(number,inMin,inMax,outMin,outMax){return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;}
function ha(n){let ton=0;n=n.toString(); for(let y=0; y<n.length;y++){let m=n.charCodeAt(y);for(let i=0; i<=100; i++){m=Math.sin(m);ton+=((m+1)/2)*(i%2-1);}};return ton.toPrecision(100).toString().split(".")[1].substring(0,ton.toPrecision(100).toString().split(".")[1].indexOf("0000"))}
function ha2(o){let tot=""; o=ha(o);if(o.length%2){o=o.substring(1)}for(let x=0; x<o.length; x+=2){tot+=String.fromCharCode(mapb(parseInt(o[x]+o[x+1]),0,99,32,126))} return tot}
function ha3(p){let top=0;for(let c=0; c<p.length; c++){top+=0.5*(Math.sin(p.charCodeAt(c))+1)*(c%2-1);}let v = Math.abs(top*100); v = Math.round(v);for(let c = 0; c<=v;c++){p=ha2(p)}return p}
function ha4(l){l=l.toString();let tou=0;for(let u=0;u<l.length;u++){tou+=l.charCodeAt(u)}console.log(l+" "+tou);for(let u=0;u<(tou%10)+10;u++){l=ha3(l)}return l}
function safe(unsafe){return unsafe.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("'","&#039;")}
function area (p1, p2, p3){return Math.abs(p1.x*(p2.y-p3.y)+p2.x*(p3.y-p1.y)+p3.x*(p1.y-p2.y))/2;}
function train(x){x=x*x*100-x*x*x;let y = x==Math.abs(x);x=Math.max(0.1,Math.abs(x));x=Math.log10(x);x*=y-0.5;x=Math.pow(x,3);return x}
function atan(x,n){let o=0;for(let v=1; v<n*2;v+=2){o+=Math.pow(x,v)/v*((v+2)%4-2)}return o}
function atane(x,n){let o=0;for(let v=0; v<n;v++){o+=Math.pow(x,v*2+1)*odds[v]*((v%2-0.5)*2)}return o}

function inTriangle (pt, p1, p2, p3)
{
    return (area(p1,p2,p3)==area(pt,p2,p3)+area(p1,pt,p3)+area(p1,p2,pt));
}

var widthFill = 0.5;
var heightFill = 0.5;

var triangleVertices, can, gl, vertexShader, fragmentShader, program, tVBO, posAttribLoc, offAttribLoc, colAttribLoc, poscol, positions;

var vs =
[
    "precision mediump float;",
    "",
    "attribute vec2 objPosition;",
    "attribute vec2 offset;",
    "attribute vec3 vertColor;",
    "varying vec3 fragColor;",
    "",
    "void main()",
    "{",
    "fragColor = vertColor;",
    "gl_Position = vec4(objPosition+offset, 0.0, 1.0);",
    "}"
].join("\n");

var fs =
[
    "precision mediump float;",
    "",
    "varying vec3 fragColor;",
    "void main()",
    "{",
    "gl_FragColor = vec4(fragColor, 0.5);",
    "}"
].join("\n");

const floatSize = Float32Array.BYTES_PER_ELEMENT;


function attributes(){

    gl.bindBuffer(gl.ARRAY_BUFFER, tVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(
        posAttribLoc, // Atribute location
        2, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE, // Is normalised?
        2*floatSize,// Size of an individual vertex
        0 // Offset from the begining of a single vertex
    )

    gl.bindBuffer(gl.ARRAY_BUFFER, poscol);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(
        offAttribLoc, // Atribute location
        2, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE, // Is normalised?
        5*floatSize,// Size of an individual vertex
        0// Offset from the begining of a single vertex
    )

    gl.vertexAttribPointer(
        colAttribLoc, // Atribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE, // Is normalised?
        5*floatSize, // Size of an individual vertex
        2*floatSize // Offset from the begining of a single vertex
    )
}

function glload(){
    can = document.getElementById("can't");
    gl = can.getContext("webgl");

    if(!gl){
        alert("Din webläsare kan inte hantera webgls kraft, weakling!");
        window.stop();
    }
    window.onresize = function(){
        can.width = window.innerWidth* widthFill;
        can.height = window.innerHeight* heightFill;
        gl.viewport(0,0,can.width,can.height);
    }

    can.width = window.innerWidth* widthFill;
    can.height = window.innerHeight* heightFill;
    gl.viewport(0,0,can.width,can.height);
    gl.clearColor(1.0,1.0,1.0,1.0);
    
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vertexShader, vs);
    gl.shaderSource(fragmentShader, fs);
    
    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        console.error("ERROR compiling vertex shader!", gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
        console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(fragmentShader));
        return;
    }

    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error("Error linking program!", gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
        console.error("Error validating program", gl.getProgramInfoLog(program));
        return;
    }

    triangleVertices = [0.1,0.0,0.2,0.2,0.0,0.2];
    positions = [0.2,0.5,1.0,0.0,0.5,0.2,0.5,1.0,0.0,0.5,0.2,0.5,1.0,0.0,0.5];


    tVBO = gl.createBuffer();
    poscol = gl.createBuffer();

    posAttribLoc = gl.getAttribLocation(program, "objPosition");
    offAttribLoc = gl.getAttribLocation(program, "offset");
    colAttribLoc = gl.getAttribLocation(program, "vertColor");

    attributes();

    gl.enableVertexAttribArray(posAttribLoc);
    gl.enableVertexAttribArray(colAttribLoc);

    gl.useProgram(program);
}

function draw(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    attributes();

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    window.requestAnimationFrame(draw);
}