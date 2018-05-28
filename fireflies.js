// var canvas = document.getElementById("stars-canvas");
// canvas.height = window.innerHeight * 0.5;
// canvas.width = window.innerWidth;

var Firefly = function(x, y, radius){
  this.x = x;
  this.y = y;
  this.radius = radius;

  var max_speed = 3;
  var max_acceleration = 1;
  var max_off_time = 1500;
  var max_on_time = 150;

  this.next_transition = Math.floor(random(0, max_off_time));

  this.velocity = {
    x: 0,
    y: 0
  };

  this.flashing = false;

  this.opacity = 0;


  this.draw = function(ctx, bounds){

    if(this.next_transition <= 0){

      if(this.flashing){
        this.next_transition = Math.floor(random(0, max_off_time));
      } else {
        this.next_transition = Math.floor(random(0, max_on_time));
      }

      this.flashing = !this.flashing;
    }

    if(this.flashing){
      this.opacity += 0.05;
      this.opacity = clip(this.opacity, 0, 1);
    } else {
      this.opacity -= 0.05;
      this.opacity = clip(this.opacity, 0, 1);
    }

    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 0, " + this.opacity + ")";
    // ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    ctx.fill();


    var xChange = random(-max_acceleration, max_acceleration);
    var yChange = random(-max_acceleration, max_acceleration);

    var alpha = 0.3;

    this.velocity.x = alpha * (xChange + this.velocity.x) + (1 - alpha) * this.velocity.x;
    this.velocity.y = alpha * (xChange + this.velocity.y) + (1 - alpha) * this.velocity.y;

    this.velocity.x = Math.sign(this.velocity.x) * Math.min(Math.abs(this.velocity.x), max_speed);
    this.velocity.y = Math.sign(this.velocity.y) * Math.min(Math.abs(this.velocity.y), max_speed);

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(this.x <= 0 || this.x >= bounds.x){
      this.x = clip(this.x, 0, bounds.x);
      this.velocity.x *= -1;
    }

    if(this.y <= 0 || this.y >= bounds.y){
      this.y = clip(this.y, 0, bounds.y);
      this.velocity.y *= -1;
    }

    this.next_transition--;
  };
};

function random(min, max){
  return Math.random() * (max - min) + min;
}

function clip(value, min, max){
  return Math.max(Math.min(value, max), min);
}

function normalDist(mean, standardDeviation){
  var a = Math.random();
  var b = Math.random();
  var normal = Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
  return normal * standardDeviation + mean;
}

var fireflies = function(canvas, numFlies, backgroundColor){
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var minFlyRadius = 1;
  var maxFlyRadius = 3;

  var ctx = canvas.getContext("2d");

  var flies = [];

  for (var i = 0; i < numFlies; i++) {
    var x = Math.floor(random(0, canvasWidth));
    var y = Math.floor(random(0, canvasHeight));
    var radius = clip(Math.ceil(normalDist(2, 1)), minFlyRadius, maxFlyRadius);

    var fly = new Firefly(x, y, radius);
    // fly.draw(ctx);
    flies.push(fly);
  }

  var draw = function(){
    // TODO: draw flies
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    flies.forEach(function(fly){
      fly.draw(ctx, {x: canvasWidth, y: canvasHeight});
    });
    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
};

var canvasArea = canvas.width * canvas.height;

fireflies(canvas, Math.ceil(canvasArea / 2200), "black");//"#052639");
