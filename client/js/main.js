var x = 0;
var a = 0;
var img = new Image();
img.src = 'img/robo.png';
var current = {x:0, y:0};
var animated = false;
var animation = [
    {
        sx: 172,
        sy: 40,
        swidth: 25,
        sheight: 30
    },
    {
        sx: 198,
        sy: 40,
        swidth: 25,
        sheight: 30
    },
    {
        sx: 226,
        sy: 40,
        swidth: 25,
        sheight: 30
    },
    {
        sx: 253,
        sy: 40,
        swidth: 25,
        sheight: 30
    }
];

function init(){
  placeObj();
  bounce();
  setInterval(bounce,100);
}
function bounce(){
  x++;
  var ctx = document.getElementById('canvas').getContext('2d');
  var now = new Date();
  ctx.clearRect(0,0,150,150);
  ctx.fillRect(50,(x-150)<0?x:(300-x),10,10);  // Draw a rectangle with default settings
  ctx.save();                  // Save the default state
  if(x == 300) x=0;
}
function animate(){
  var ctx = document.getElementById('game').getContext('2d');
  var rect = $('#game')[0].getBoundingClientRect();
  ctx.clearRect(0,0,rect.width,rect.height);
  ctx.drawImage(img,animation[a].sx,animation[a].sy,animation[a].swidth,animation[a].sheight,current.x,current.y,animation[a].swidth,animation[a].sheight);
  if(a==animation.length-1)
      a=0;
  else
      a++;
}
function placeObj(){
  var ctx = document.getElementById('game').getContext('2d');
  ctx.clearRect(0,0,150,150);
  //ctx.fillRect(50,50,10,10);  // Draw a rectangle with default settings
  ctx.drawImage(img,0,0,30,35,50,50,30,35);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function moveObj(coord){
  var ctx = document.getElementById('game').getContext('2d');
  var rect = $('#game')[0].getBoundingClientRect();
  current = coord;
  ctx.clearRect(0,0,rect.width,rect.height);
  ctx.drawImage(img,0,0,30,35,coord.x,coord.y,30,35);
  if(!animated){
      setInterval(animate,300);
      animated = true;
  }
  //animate();
}

$("#game").click(function(evntObj) {
  var coord = getMousePos(ctx, eventObj);
  console.log("Clicked "+coord.x+", "+coord.y);
  moveObj(coord);
});

$(document).ready( function(){
	init();
	$('p').text('Hello World');
$("#game").click(function(evntObj) {
  var coord = getMousePos(this, evntObj);
  console.log("Clicked "+coord.x+", "+coord.y);
  moveObj(coord);
});
});
