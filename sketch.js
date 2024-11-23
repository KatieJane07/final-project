// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let width = 400;
let height = 600;
let biker = {
  x: width/2,
  y: height/5*4,
  radius: 50,
};
let x = width/2;
let y = height/5*4;
let bushes = [];
let bush = {
  x: width/2 - width/3,
  y: 0,
  speed: 3,
  radius: 80,
};
let radius = 50;
let collide = false;
let bgImg;
let scene = "bikeGame";

function preload() {
  //bgImg = loadImage("bikeBackground.jpg");
}
function setup() {
  createCanvas(width, height);
}

function draw() {
  background(220);
  displayBike();
  displayBushes();
  bikeGameRules();

}

//bikeGame
function displayBike() {
  if (scene === "bikeGame") {
    fill("pink")
    circle(biker.x, biker.y, biker.radius);
    line(width/3,height, width/3, 0);
    line(width/3*2,height, width/3*2,0);
  }
}

//bikeGame
function displayBushes() {
  fill("green");
  circle(bush.x, bush.y, bush.radius)
  bush.y += bush.speed;
}

//bikeGame
function bikeGameRules() {
  let distanceAway = dist(biker.x, biker.y, bush.x, bush.y);
  if (distanceAway < bush.radius) {
    collide = true;
  }
  else{
    collide = false;
  }
  if (collide === true) {
    text("end game",width/2, height/2);
    //you crashed image
    //scene = ""
  }
}

function keyPressed() {
  if (scene === "bikeGame") {
    if (keyCode === LEFT_ARROW) {
      if (biker.x - width/3 > 0) {
        biker.x -= width/3;
      }
    }
    if (keyCode === RIGHT_ARROW) {
      if (biker.x + width/3 < width){
        biker.x += width/3
      }
    }
  }
}
