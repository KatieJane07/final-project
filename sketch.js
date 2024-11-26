// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//canvas and display
let width = 400;
let height = 600;
let scene = "bikeGame";

//bike game
let biker = {
  x: width / 2,
  y: height / 5 * 4,
  radius: 50,
};
let x = width / 2;
let y = height / 5 * 4;
let theBushes = [];
let bush = {
  x: width / 2 - width / 3,
  y: 0,
  speed: 1,
  radius: 40,
};
let radius = 50;
let collide = false;

//images
let bikeBgImg;

function preload() {
  //bike game
  //bikeBgImg = loadImage("bikeBackground.jpg");
  //bikerImg
  //bushImg
  //crashImg

  //ispy
  //ispy bg
  //finditem1
  //finditem2
  //finditem3
  //finditem4

}
function setup() {
  createCanvas(width, height);
}

function draw() {
  background(220);
  bikeGame();
  iSpyGame();
 
}

function mousePressed() {

}

function keyPressed() {
  if (scene === "bikeGame") {
    if (keyCode === LEFT_ARROW) {
      if (biker.x - width / 3 > 0) {
        biker.x -= width / 3;
      }
    }
    if (keyCode === RIGHT_ARROW) {
      if (biker.x + width / 3 < width) {
        biker.x += width / 3;
      }
    }
  }
}

function bikeGame() {
  displayBike();
  displayBushes();
  bikeGameRules();
}

function iSpyGame() {
  displayiSpy();
  placeItems();
}

//bikeGame
function displayBike() {
  if (scene === "bikeGame") {
    //background(bikeBgImg);
    fill("pink");
    circle(biker.x, biker.y, biker.radius);
    line(width / 3, height, width / 3, 0);
    line(width / 3 * 2, height, width / 3 * 2, 0);
  }
}

//bikeGame
// function killBush() {
//   for (item of theBushes) {
//     if (bush.y < height) {
//       theBushes.pop(item);
//       theBushes.push(bush);
//     }
//   }
// }

//bikeGame
function displayBushes() {
  fill("green");
  for (let bush of theBushes) {
    circle(bush.x, bush.y, bush.radius * 2);
    bush.y += bush.speed;
  }
}

//bikeGame
function bikeGameRules() {
  let distanceAway = dist(biker.x, biker.y, bush.x, bush.y);
  if (distanceAway < bush.radius) {
    collide = true;
  }
  else {
    collide = false;
  }
  if (collide === true) {
    text("end game", width / 2, height / 2);
    //you crashed image
    //scene = ""
  }
}

//iSpy Game
function displayiSpy() {
  if (scene === "iSpy") {
    //background(iSpyBgImg)

  }
}

//iSpy Game
function placeItems() {
  //randomly place 4 items to find based on a grid system
}