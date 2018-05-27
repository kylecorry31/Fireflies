var canvas = document.getElementById("stars-canvas");
canvas.height = window.innerHeight * 0.5;
canvas.width = window.innerWidth;

var Star = function(x, y, radius, color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.draw = function(ctx){
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    ctx.fill();
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

var stars = function(canvas, numStars, backgroundColor){
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var minStarRadius = 1;
  var maxStarRadius = 4;
  var minStarOpacity = 0.4;
  var maxStarOpacity = 0.9;

  var ctx = canvas.getContext("2d");

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  for (var i = 0; i < numStars; i++) {
    var x = Math.floor(random(0, canvasWidth));
    var y = Math.floor(random(0, canvasHeight));
    var radius = clip(Math.ceil(normalDist(1, 1)), minStarRadius, maxStarRadius);
    var opacity = random(minStarOpacity, maxStarOpacity);

    var star = new Star(x, y, radius, "rgba(255, 255, 255, " + opacity + ")");
    star.draw(ctx);
  }
};

// stars(canvas, 400, "#052639");
