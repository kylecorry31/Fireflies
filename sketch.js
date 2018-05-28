var fireflies = [];

function preload(){
	soundFormats('mp3', 'ogg');
	night = loadSound('nighttime.mp3');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noStroke();
	for(var i = 0; i < ceil(width * height / 2000); i++){
		fireflies.push(new Firefly());
	}
	night.setVolume(0.1);
  	night.loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw(){
	background(0);
	fireflies.forEach(function(fly){ fly.draw() });
}


function Firefly(){
	this.x = random(width);
	this.y = random(height);
	this.radius = constrain(randomGaussian(3, 2), 0, 5);
	this.noiseX = random(width);
	this.noiseY = random(height);

	var max_speed = 3;
	var max_acceleration = 1;
	var max_off_time = 1500;
	var max_on_time = 150;

	this.next_transition = floor(random(0, max_off_time));

	this.flashing = false;

	this.opacity = 0;


	this.draw = function(){

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
	translate(-width, -height);

	noStroke();
	fill('rgba(255, 255, 0, ' + this.opacity + ')');
	ellipse(this.x, this.y, this.radius);

	translate(width, height);

	this.x = noise(this.noiseX) * width * 3;
	this.y = noise(this.noiseY) * height * 3;

	this.next_transition--;

	this.noiseY += 0.002;
	this.noiseX += 0.002;
	};
}