var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.width = 800;
c.height = 800;

//creates a point at the canvas center
var CC = new point(c.width / 2, c.height / 2, 0);

//creates an array of random prisms
var prisms = [];
var numprisms = 5;
var rotations = [[],[]];
for(i1 = 0; i1 < numprisms; i1++) {
	prisms[i1] = new prism(c.width * Math.random(), c.height * Math.random(), 500 * Math.random() - 100, 75 * Math.random() + 25, 75 * Math.random() + 25, 7 * Math.random() + 3);
	//creates two random sets of rotations
	rotations[0][i1] = 0.02 * Math.random() - 0.01;
	rotations[1][i1] = 0.02 * Math.random() - 0.01;
	prisms[i1].rotate(prisms[i1].center, 14 * Math.random() - 7, 14 * Math.random() - 7);
}

setInterval(function() {
ctx.clearRect(0, 0, c.width, c.height);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, c.width, c.height);

//rotates and draws all elements of prisms
for(i1 = 0; i1 < prisms.length; i1++) {
	prisms[i1].rotate(prisms[i1].center, rotations[0][i1], rotations[1][i1]);
	prisms[i1].draw();
}

}, 0.06);

//prism constructor
function prism(x, y, z, r, h, n) {
	this.faces = [];
	this.center = new point(x, y, z);
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
	this.h = h;
	this.n = Math.round(n);
	//creates the bases
	this.faces[0] = regularPolygon(this.x, this.y, this.z - this.h / 2, this.r, this.n, "blue");
	this.faces[1] = regularPolygon(this.x, this.y, this.z + this.h / 2, this.r, this.n, "green");
	//creates the lateral faces
	for(k = 2; k < this.n + 2; k++) {
		this.faces.push(
			rectangle(this.x, this.y, this.z - this.h / 2, this.h, this.r * 2 * Math.sin(2 * Math.PI / this.n / 2))
		);
		//moves all the lateral faces to the correct locations
		this.faces[k].translate(this.r, 0, 0);
		this.faces[k].rotate(this.faces[k].points[0], -Math.PI / 2, Math.PI / 2);
		this.faces[k].rotate(this.faces[k].points[0], Math.PI / 2 + Math.PI / this.n, 0);
		this.faces[k].rotate(this.center, 2 * Math.PI / this.n * k, 0);
	};
	this.translate = function(tx, ty, tz) {
		this.center.translate(tx, ty, tz);
		for(i3 = 0; i3 < this.faces.length; i3++) {
			for(j3 = 0; j3 < this.faces[i3].points.length; j3++) {
				this.faces[i3].points[j3].translate(tx, ty, tz);
			}
		}
	}
	this.stretch = function(p, factor) {
		this.center.stretch(p, factor);
		for(i3 = 0; i3 < this.faces.length; i3++) {
			for(j3 = 0; j3 < this.faces[i3].points.length; j3++) {
				this.faces[i3].points[j3].stretch(p, factor);
			}
		}
	}
	//rotates the whole prism
	this.rotate = function(anchor, angleZ, angleY) {
		this.center.rotate(anchor, angleZ, angleY);
		for(g = 0; g < this.faces.length; g++) {
			this.faces[g].rotate(anchor, angleZ, angleY);
		}
	};
	//draws the prism
	this.draw = function() {
		if(this.faces[0].points[0].z >= this.faces[1].points[0].z) {
			this.faces[1].draw();
		} else {
			this.faces[0].draw();
		}
		for(g = 2; g < this.faces.length; g++) {
			this.faces[g].draw();
		}
		if(this.faces[0].points[0].z >= this.faces[1].points[0].z) {
			this.faces[0].draw();
		} else {
			this.faces[1].draw();
		}
	};
}

//regular polygon constructor
function regularPolygon(x, y, z, r, n, color) {
	var points = [];
	points[0] = new point(x, y, z);
	for(i = 0; i < Math.round(n); i++) {
		points.push(
			new point(x + r, y, z)
		);
		points[i + 1].rotate(points[0], i * 2 * Math.PI / Math.round(n), 0);
	};
	var locus1 = new locus(points)
	locus1.draw = function() {
		//draws a 
		ctx.beginPath();
		ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
		ctx.lineTo(this.points[1].x, this.points[1].y);
		for(i = 1; i < this.points.length - 1; i++) {
		ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
		}
		ctx.fillStyle = color;
		ctx.fill();
	};
	return locus1;
}

//rectangle constructor
function rectangle(x, y, z, l, w) {
	var locus1 = new locus([
		new point(x, y, z),
		new point(x + l, y, z),
		new point(x + l, y + w, z),
		new point(x, y + w, z),
	]);
	locus1.draw = function() {
		//draws a 
		ctx.beginPath();
		ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
		ctx.lineTo(this.points[0].x, this.points[0].y);
		for(i = 0; i < this.points.length - 1; i++) {
		ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
		}
		ctx.fillStyle = "red";
		ctx.fill();
	};
	return locus1;
}

//locus constructor
function locus(points) {
	this.points = points;
	this.translate = function(tx, ty, tz) {
		for(i = 0; i < this.points.length; i++) {
			this.points[i].translate(tx, ty, tz);
		}
	};
	this.rotate = function(p, rotz, rotx) {
		for(i = 0; i < this.points.length; i++) {
			this.points[i].rotate(p, rotz, rotx);
		}
	};
	this.draw = function() {
		for(i = 0; i < this.points.length; i++) {
			this.points[i].draw();
		}
	};
}

//finds the angle between two points
function findAngle(x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	if(dx == 0) {
		if(dy > 0) {
			return Math.PI / 2
		} else if(dy < 0) {
			return 3 * Math.PI / 2
		} else {
			return 0;
		}
	} else if(dx < 0) {
		return Math.PI + Math.atan(dy / dx);
	} else if(dy < 0) {
		return 2 * Math.PI + Math.atan(dy / dx);
	} else {
		return Math.atan(dy / dx);
	}

}

//finds the distance between points
function d(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

//point object
function point(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.translate = function(tx, ty, tz) {
		this.x += tx;
		this.y += ty;
		this.z += tz;
	};
	this.stretch = function(p, factor) {
		this.x = p.x + factor * (this.x - p.x);
		this.y = p.y + factor * (this.y - p.y);
		this.z = p.z + factor * (this.z - p.z);
	}
	//rework for consistency
	this.rotate = function(p, rotz, rotx) {
		var r = d(p.x, p.y, this.x, this.y);
		var a = findAngle(p.x, p.y, this.x, this.y);
		a += rotz;
		this.x = r * Math.cos(a) + p.x;
		this.y = r * Math.sin(a) + p.y;
		var r2 = d(p.z, p.y, this.z, this.y);
		var a2 = findAngle(p.z, p.y, this.z, this.y);
		a2 += rotx;
		this.z = r2 * Math.cos(a2) + p.z;
		this.y = r2 * Math.sin(a2) + p.y;
	};
	this.draw = function() {
		drawDot(this.x, this.y);
	};
}

//draws a dot
function drawDot(x, y) {
		ctx.beginPath();
		ctx.arc(x, y, 1, 0, 2 * Math.PI);
		ctx.stroke();
}