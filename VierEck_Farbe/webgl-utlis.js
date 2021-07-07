
var vertexShaderSource= `#version 300 es

in vec4 a_position;

in vec4 vColor;

out vec4 vfColor;

void main(){

    gl_Position = a_position;
    vfColor=vColor;


}
`;


var fragmentShaderSource= `#version 300 es
precision mediump float;

in vec4 vfColor;
out vec4 fColor;


void main(void){
   fColor=vfColor;
}

`
function main(){
    var canvas= document.getElementById('c');
    var gl = canvas.getContext("webgl2");

    if(!gl){
    return "Hallo";
}


var vertexShader= createShader(gl,gl.VERTEX_SHADER,vertexShaderSource);
var fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource);

var program = createProgram(gl, vertexShader,fragmentShader);

//About position Buffer
var positionAttributeLocation= gl.getAttribLocation(program, "a_position");

var positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);


var position =[

    0.5, 0.5,
    -0.5, 0.5,
    0.5, -0.5,
    -0.5, -0.5,
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position),gl.STATIC_DRAW);

var vao = gl.createVertexArray();
gl.bindVertexArray(vao);

gl.enableVertexAttribArray(positionAttributeLocation);

//Tell the atrribute how to get ...

var size =2;
var type = gl.FLOAT;
var normalize = false;
var stride = 0 ;
var offset = 0;
gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);

//webglUtils.resizeCanvasToDisplaySize(gl.canvas);
//webglUtils.resizeCanvasToDisplaySize(gl.canvas);

//About Colors


var colorAttributeLocation= gl.getAttribLocation(program, "vColor");
var colorBuffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);

var colors=[
    1.0,    1.0,    1.0,    1.0,
    1.0,    0.0,    0.0,    1.0,
    0.0,    1.0,    0.0,    1.0,
    0.0,    0.0,    1.0,    1.0,

];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors),gl.STATIC_DRAW);


gl.enableVertexAttribArray(colorAttributeLocation);

var size =4;
var type = gl.FLOAT;
var normalize = false;
var stride = 0 ;
var offset = 0;
gl.vertexAttribPointer(
    colorAttributeLocation, size, type, normalize, stride, offset);


gl.viewport(0,0,gl.canvas.width, gl.canvas.height);

gl.clearColor(0,0,0,0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);

gl.bindVertexArray(vao);

var primitiveType= gl.TRIANGLES;
var offset=0;
gl.drawArrays(gl.TRIANGLE_STRIP,offset,4);

}

function createShader(gl,type,source){
    var shader = gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    var sucess = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
    if(sucess){
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);

}

function createProgram(gl,vertexShader,fragmentShader){
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var sucess = gl.getProgramParameter(program,gl.LINK_STATUS);
    if(sucess){
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}



main();

