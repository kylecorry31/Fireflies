var stars = [];
var mountains = [];
var sun = undefined;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noStroke();
	for(var i = 0; i < ceil(width * height / 2000); i++){
		stars.push(new Star());
	}

	// for(var i = 0; i < 1; i++){
	// Night
	mountains.push(new MountainRange("6, 47, 71", 1, 400, 600));
	mountains.push(new MountainRange("5, 42, 63", 1, 250, 450));
	mountains.push(new MountainRange("5, 36, 54", 1, 0, 300));
	// Day
	// mountains.push(new MountainRange("24, 160, 53", 1, 400, 600));
	// mountains.push(new MountainRange("5, 42, 63", 1, 250, 450));
	// mountains.push(new MountainRange("5, 36, 54", 1, 0, 300));
	sun = new Sun('253, 184, 19', width-200, height - 500, 100);
	// }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw(){
	// night
	// background('#052436');
	// stars.forEach(function(star){ star.draw() });
	// day
	background('#87CEEB');
	if (sun) {
		sun.draw();
	}
	mountains.forEach(function(mountain){ mountain.draw() });
}


function Star(){
	this.x = random(width);
	this.y = random(height);
	this.radius = constrain(randomGaussian(2, 2), 1, 4);
	this.opacity = random(0.4, 0.9);

	this.draw = function(){
		// Centers the distribution of stars
		// translate(-width, -height);

		noStroke();
		fill('rgba(255, 255, 255, ' + this.opacity + ')');
		ellipse(this.x, this.y, this.radius);

		// translate(width, height);
	};
}

function MountainRange(color, opacity, yMin, yMax){

	this.xoffStart = random(width);

	this.draw = function(){
		noStroke();
		fill('rgba(' + color + ', ' + opacity + ')');

		beginShape(); 
		var yoff = 0;  
		var xoff = this.xoffStart;	
		var y = 0;       
		for (var x = 0; x <= width; x += 10) {
			y = map(noise(xoff, yoff), 0, 1, height-yMin, height-yMax);

		    vertex(x, y); 
		    xoff += 0.04;
		}
		vertex(width, y);
		vertex(width, height);
		vertex(0, height);
		endShape(CLOSE);
		
	}
}

function Sun(color, x, y, radius){

	this.draw = function(){
		noStroke();

		fill("rgba(" + color + ", " + 1 + ")");

		ellipse(x, y, radius);

	}
}