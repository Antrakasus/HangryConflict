var widthFill = 0.5;
var heightFill = 0.5;

var vs =
[
    "precision mediump float;",
    "",
    "attribute vec2 vertPosition;",
    "attribute vec3 vertColor;",
    "varying vec3 fragColor;",
    "",
    "void main()",
    "{",
    "fragColor = vertColor;",
    "gl_Position = vec4(vertPosition, 0.0, 1.0);",
    "}"
].join("\n");

var fs =
[
    "precision mediump float;",
    "",
    "varying vec3 fragColor;",
    "void main()",
    "{",
    "gl_FragColor = vec4(fragColor, 1.0);",
    "}"
].join("\n");

const floatSize = Float32Array.BYTES_PER_ELEMENT;




function load(){
    var can = document.getElementById("can't");
    var gl = can.getContext("webgl");

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
    gl.clearColor(0.5,0.2,0.8,0.75)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
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

    var program = gl.createProgram();
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

    var triangleVertices = 
    [
        0.0, 0.5, 1.0, 1.0, 0.0,
        -0.5, -0.5, 0.7, 0.0, 1.0,
        0.5, -0.5,  0.1, 1.0, 0.6
    ];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    var colorAttribLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(
        positionAttribLocation, // Atribute location
        2, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE, // Is normalised?
        5*Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex
        0// Offset from the begining
    )

    gl.vertexAttribPointer(
        colorAttribLocation, // Atribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE, // Is normalised?
        5*floatSize, // Size of an individual vertex
        2*floatSize // Offset from the begining of a single vertex
    )

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

