    


    
/* global variables */
let gl;

let thetaLoc; // a "pointer" to the shader variable theta

let theta; // the angle theta in CPU
let fColorLocation;
var translation ;
var Scale;
var Matrix;

var CheckDirection = false;
 
var delay= 500;

var  RED=0.8;
var BLUE=0.5;
var GREEN=0.5;

let vposition;

var rotate=0;
var vertices;
var scaleMatrix;
var Sx = 0.50, Sy = 0.50, Sz = 1.0;


var Tx = -0.2, Ty = 0.0, Tz = 0.0;
window.onload = function main () {

    const canvas = document.querySelector("#glcanvas");
   // gl = canvas.getContext("webgl");
   
   
   
   
   
    gl = WebGLUtils.setupWebGL(canvas);


    if(!gl){
        alert("WebGL is not available!");
        return -1;
    }

   

    const program = initShaders(gl, "vertex-shader", "fragment-shader");

    gl.useProgram(program);
  
    
    var myButton = document.getElementById("DirectionButton"); 
    myButton.addEventListener("click", function() {CheckDirection = !CheckDirection;});
         

    var myButton2 = document.getElementById("startButton"); 
    myButton2.addEventListener("click", function() {rotate=1;});

    var myButton3 = document.getElementById("stopButton"); 
    myButton3.addEventListener("click", function() {rotate=0;});

    var m = document.getElementById("color");
    m.addEventListener("click", function() {
        switch (m.selectedIndex) {
            case 0:
          RED=1.0;GREEN=0.0;BLUE=0.0;      
                break;
            case 1:
                RED=0.0;GREEN=0.250;BLUE=0.150;  
                break;
            case 2:
                RED=0.0;GREEN=0.0;BLUE=1.0;  
                break;
            case 3:
                 RED=1.0;GREEN=1.0;BLUE=0.0;  
                    break;
            case 4:
                 RED=0.52;GREEN=0.0;BLUE=1.0;  
                        break;
             case 5:
                 RED=1.0;GREEN=1.0;BLUE=1.0;  
                     break;           
                    }
    });
    

    var scaleLargeButton = document.getElementById("Lscale"); 
    scaleLargeButton.addEventListener("click", function() { Sx+=0.1,Sy+=0.1;});

    var scaleSmallButton = document.getElementById("Sscale"); 
    scaleSmallButton.addEventListener("click", function() { Sx-=0.1,Sy-=0.1;});






    document.getElementById("slide").onchange = function() {delay = this.value; };




    window.onkeydown = 
    function(event) {
       var key = String.fromCharCode(event.keyCode);
      
       switch (key) {
       case "1":
        
        Ty+=0.1;
             break;
          case "2":
           Tx-=0.1;
             break;
          case "3":
           Tx+=0.1;
             break;
          case "4":
           Ty-=0.1;
                break;   
       }
    };
 



    
 vertices= [vec2( -0.6,0.8 ),  
    vec2( -0.6,0.7 ),
    vec2( -0.1,0.8 ),

    vec2( -0.1, 0.7 ),
    vec2( -0.6,0.7 ),
    vec2( -0.1,0.8 ),
                   vec2( -0.6, 0.7 ),  
                   vec2( -0.6, 0.3 ),
                   vec2( -0.5, 0.7 ),
                   
                   vec2( -0.6, 0.3 ),
                   vec2( -0.5, 0.7 ),
                   vec2( -0.5, 0.3 ),
                
                vec2  ( -0.5,0.4),
                 vec2  (-0.5,0.3),
                vec2   (-0.1,0.4),

                   vec2(-0.5,0.3),
                  vec2 (-0.1,0.4),
                  vec2 (-0.1,0.3),
                
                  vec2(-0.2,0.3),
                  vec2(-0.2,0.0),
                  vec2(-0.1,0.3),
                
                  vec2(-0.2,0.0),
                  vec2(-0.1,0.3),
                   vec2(-0.1,0.0),

                vec2(-0.6,0.0),
                 vec2(  -0.6,-0.1),
                  vec2(-0.1,0.0),

                  vec2(  -0.6,-0.1),
                  vec2(-0.1,0.0),
                  vec2( -0.1,-0.1 ),

                 vec2 (-0.4,-0.1),
                  vec2(-0.4,-0.2),
                  vec2(-0.3,-0.1),

                  vec2(-0.4,-0.2),
                  vec2(-0.3,-0.1),
                   vec2 (-0.3,-0.2),
                
//ĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞĞ
vec2(0.3,0.9),
vec2(0.3,1.0),
vec2(0.6,0.9),

vec2(0.3,1.0),
vec2(0.6,0.9),
vec2(0.6,1.0),

vec2(0.7,0.8),
vec2(0.3,0.8),  
vec2(0.7,0.7),

vec2(0.3,0.8),  
vec2(0.7,0.7),
vec2(0.3,0.7),

vec2(0.2,-0.1),
vec2(0.3,-0.1),
vec2(0.2,0.8),

vec2(0.3,0.8),
vec2(0.3,-0.1),
vec2(0.2,0.8),

vec2(0.3,-0.1),
vec2(0.3,0.0),
vec2(0.6,-0.1),

vec2(0.3,0.0),
vec2(0.6,-0.1),
vec2(0.6,0.0),

vec2(0.7,-0.1),
vec2(0.6,-0.1),
vec2(0.7,0.2),

vec2(0.6,0.2),
vec2(0.6,-0.1),
vec2(0.7,0.2),

vec2(0.7,0.2),
vec2(0.7,0.3),
vec2(0.4,0.2),

vec2(0.7,0.3),
vec2(0.4,0.2),
vec2(0.4,0.3),
]



    const bufferID = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferID ); // bind this buffer to this canvas
    /* put coordinates into the buffer */
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    
   
    
    /* 1. Vertex Attribute */
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(vPosition);



 //translation////
 
 translation = gl.getUniformLocation(program, 'translation');
 
//scale



Scale = gl.getUniformLocation(program, 'scale');

 
    thetaLoc = gl.getUniformLocation( program, "theta" ); 
   
    fColorLocation = gl.getUniformLocation(program, "fColor");
 

   
    theta = 0.0;
  
    render();
}

function render(){
    /* this function will be called in each frame */
  setTimeout( function(){
    requestAnimationFrame(render);
  
    Matrix= new Float32Array([
        Sx,   0.0,  0.0,  0.0,
        0.0,  Sy,   0.0,  0.0,
        0.0,  0.0,  Sz,   0.0,
        0.0,  0.0,  0.0,  1.0  
     ]);


    gl.uniformMatrix4fv(Scale, false, Matrix);

    gl.uniform4f(translation, Tx, Ty, Tz, 0.0);
    gl.uniform4f(fColorLocation, RED, GREEN, BLUE, 1.0);
    gl.clearColor(0.0, 0.82, 0.6, 1.0);
    gl.clear( gl.COLOR_BUFFER_BIT ); // Clear Background
  
 if(rotate!=0){
   theta += (CheckDirection ? -0.1 : 0.1);

    gl.uniform1f( thetaLoc, theta );// rotate=0;
}

    gl.drawArrays( gl.TRIANGLES, 0, 72); 
},delay);

   
}

