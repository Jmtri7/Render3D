var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var cw = c.width;
var ch = c.height;

var r = 100;
var w = 100;
var l = 100;
var theta = 45 / 180 * Math.PI
var rho = 45 / 180 * Math.PI

var x1;
var y1;
var x2;
var y2;
var x3;
var y3;

document.onmousemove = function(e){

theta = e.pageX / 180 * Math.PI;
rho = e.pageY / 180 * Math.PI

ctx.clearRect(0, 0, c.width, c.height);

x1 = r * Math.cos(theta) + cw / 2;
y1 = r * Math.sin(theta) * Math.cos(rho) + ch / 2;

ctx.strokeStyle="red";
ctx.beginPath();
ctx.arc(cw / 2, ch / 2, 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.strokeStyle="blue";
ctx.beginPath();
ctx.arc(x1, y1, 10, 0, 2 * Math.PI);
ctx.stroke();
ctx.strokeStyle="green";

ctx.beginPath();
ctx.arc(cw - x1, ch - y1, 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.strokeStyle="black";

ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(cw - x1, ch - y1);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(cw - x1, ch - y1);
ctx.stroke();

x2 = w * Math.cos(theta + Math.PI / 2) + x1;
y2 = w * Math.sin(theta + Math.PI / 2) * Math.cos(rho) + y1;

ctx.strokeStyle="turquoise";
ctx.beginPath();
ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.strokeStyle="gray";
ctx.beginPath();
ctx.arc(cw - x2, ch - y2, 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.strokeStyle="orange";
ctx.beginPath();
ctx.arc(2 * x1 - x2, 2 * y1 - y2, 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.strokeStyle="violet";
ctx.beginPath();
ctx.arc(cw - (2 * x1 - x2), ch - (2 * y1 - y2), 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.strokeStyle="black";

ctx.beginPath();
ctx.moveTo(x2, y2);
ctx.lineTo(2 * x1 - x2, 2 * y1 - y2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cw - x2, ch - y2);
ctx.lineTo(cw - (2 * x1 - x2), ch - (2 * y1 - y2));
ctx.stroke();

ctx.beginPath();
ctx.moveTo(x2, y2);
ctx.lineTo(cw - (2 * x1 - x2), ch - (2 * y1 - y2));
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cw - x2, ch - y2);
ctx.lineTo(2 * x1 - x2, 2 * y1 - y2);
ctx.stroke();

x3 = x2;
y3 = l * Math.sin(rho) + y2;

ctx.beginPath();
ctx.arc(x3, y3, 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(2 * (cw - x2) - (cw - x3), 2 * (ch - y2) - (ch - y3), 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(2 * (2 * x1 - x2) - (2 * x1 - x3), 2 * (2 * y1 - y2) - (2 * y1 - y3), 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(cw - (2 * x1 - x3), ch - (2 * y1 - y3), 10, 0, 2 * Math.PI);
ctx.stroke();

ctx.strokeStyle="black";

ctx.beginPath();
ctx.moveTo(x3, y3);
ctx.lineTo(2 * (2 * x1 - x2) - (2 * x1 - x3), 2 * (2 * y1 - y2) - (2 * y1 - y3));
ctx.lineTo(2 * (cw - x2) - (cw - x3), 2 * (ch - y2) - (ch - y3));
ctx.lineTo(cw - (2 * x1 - x3), ch - (2 * y1 - y3));
ctx.lineTo(x3, y3);
ctx.lineTo(x2, y2);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(2 * x1 - x2, 2 * y1 - y2);
ctx.lineTo(2 * (2 * x1 - x2) - (2 * x1 - x3), 2 * (2 * y1 - y2) - (2 * y1 - y3));
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cw - (2 * x1 - x2), ch - (2 * y1 - y2));
ctx.lineTo(cw - (2 * x1 - x3), ch - (2 * y1 - y3));
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cw - x2, ch - y2);
ctx.lineTo(2 * (cw - x2) - (cw - x3), 2 * (ch - y2) - (ch - y3));
ctx.stroke();
}
