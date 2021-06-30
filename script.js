var canvas = document.createElement('canvas');
canvas.id = "canvas";
document.body.appendChild(canvas);

//getContext method to draw on  the canvas
var ctx = canvas.getContext("2d");
// radius of the circle will be half of the height so it be at the center.
var radius = canvas.height/2 ;

//position the circle with the radius points as the center
ctx.translate(radius,radius);

//90% of the radius
radius = radius * 0.90;
setInterval(drawClock,1000);

drawClock();

function drawClock(){
    drawFace(ctx,radius);
    drawNumbers(ctx,radius);
    drawTime(ctx,radius);
    
}




function drawFace(ctx,radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    
    //radial gradient design for the clock borders 
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    //outer border
    grad.addColorStop(0,'#333');
    //middle 
    grad.addColorStop(0.5,'white');
    //inner border
    grad.addColorStop(1,'#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    //draw the center of the clock
    ctx.beginPath();
    ctx.arc(0,0,radius*0.1,0,2*Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  
}

function drawNumbers(ctx,radius) {
     //draw the clock numbers
     var angle;
     var number;
     ctx.font = radius*0.15 + "px arial";
     ctx.textBaseline = "middle";
     ctx.textAlign = "center";
     for (number =1 ;number < 13 ; number++) {
          angle = number * Math.PI / 6;
          ctx.rotate(angle);
          ctx.translate(0, -radius*0.85);
          ctx.rotate(-angle);
          ctx.fillText(number.toString(),0,0);
          ctx.rotate(angle);
          ctx.translate(0, radius*0.85);
          ctx.rotate(-angle);
     }
}


function drawTime(ctx,radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));

    drawHand(ctx,hour,radius*0.5,radius*0.07);
    
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx,minute,radius*0.8,radius*0.07);

    second=(second*Math.PI/30);
    drawHand(ctx,second,radius*0.9,radius*0.02);
}


function drawHand(ctx,pos,length,width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-pos);
}

