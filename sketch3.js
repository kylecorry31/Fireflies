var fireflies = [];

function preload(){
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noStroke();
	for(var i = 0; i < ceil(width * height / 2000); i++){
		fireflies.push(new Firefly());
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw(){
	background(0);
	if (mouseIsPressed){
		noStroke();
		fill('rgba(255, 255, 255, 0.8)');
		ellipse(mouseX, mouseY, 100);
	}
	fireflies.forEach(function(fly){ fly.draw(); });
}


function getFlashingFireflies(fireflyList){
	return fireflyList.filter(function(fly){
		return fly.flashing;
	});
}


function Firefly(){
	this.x = random(width);
	this.y = random(height);
	this.radius = constrain(randomGaussian(3, 2), 0, 5);
	// this.noiseX = random(width);
	// this.noiseY = random(height);

	var max_speed = 3;
	var max_acceleration = 1;
	var max_off_time = 1500;
	var max_on_time = 150;

	this.next_transition = floor(random(0, max_off_time));

	this.flashing = false;

	this.opacity = 0;


	this.draw = function(){

	var visibleFlies = getFlashingFireflies(fireflies);
	var chosenFly = random(visibleFlies);

	var distToMouse = dist(this.x, this.y, mouseX, mouseY);

	var maxSpeed = 5;

	if(mouseIsPressed){ // Go to light
		var xDist = this.x - mouseX;
		var yDist = this.y - mouseY;


		var xSpeed = map(xDist, -10, 10, 1, -1) * random(0, 1);
		var ySpeed = map(yDist, -10, 10, 1, -1) * random(0, 1);

		this.x += xSpeed;
		this.y += ySpeed;
	} if(distToMouse < 200){ // Run from preditor, mouse
		var xDist = this.x - mouseX;
		var yDist = this.y - mouseY;


		var xSpeed = Math.sign(xDist) * map(abs(xDist), 0, 200, maxSpeed, 0) * random(0, 1);
		var ySpeed = Math.sign(yDist) * map(abs(yDist), 0, 200, maxSpeed, 0) * random(0, 1);

		this.x += xSpeed;
		this.y += ySpeed;
	} else if(chosenFly && random(0, 1) < 0.5){ // Move toward the chosen fly
		var movementIncrement = 0.005;
		this.x = lerp(this.x, chosenFly.x, movementIncrement);
		this.y = lerp(this.y, chosenFly.y, movementIncrement);
	} else {
		// No chosen fly, move randomly
		this.x = lerp(this.x, this.x + random(-maxSpeed, maxSpeed), 0.6);
		this.y = lerp(this.y, this.y + random(-maxSpeed, maxSpeed), 0.6);
	}


	if(this.next_transition <= 0){

	  if(this.flashing){
	    this.next_transition = floor(randomGaussian(max_off_time, 150));
	  } else {
	    this.next_transition = floor(randomGaussian(max_on_time, 25));
	  }

	  this.flashing = !this.flashing;
	}

	if(this.flashing){
	  this.opacity += 0.05;
	  this.opacity = constrain(this.opacity, 0, 1);
	} else {
	  this.opacity -= 0.05;
	  this.opacity = constrain(this.opacity, 0, 1);
	}

	// Centers the distribution of fireflies
	// translate(-width, -height);

	noStroke();
	fill('rgba(255, 255, 0, ' + this.opacity + ')');
	ellipse(this.x, this.y, this.radius);

	// translate(width, height);

	// this.x = noise(this.noiseX) * width * 3;
	// this.y = noise(this.noiseY) * height * 3;

	this.next_transition--;

	// this.noiseY += 0.002;
	// this.noiseX += 0.002;
	};
}
