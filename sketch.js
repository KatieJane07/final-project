// CompSci30 final
// Katie Strawson
// date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//canvas and display
let width = 400;
let height = 600;
let scene = "bikeGame";
// bikeGame
// - Cat
// - Outside
// - maze mini game
// - House
// - Witch
// iSpy

//images
let bikeBgImg;

//bike game
let theBushes = [];
let collide = false;
let biker = {
  x: width / 2,
  y: height / 5 * 4,
  radius: 50,
};



//iSpy

function preload() {
  //bike game
  bikeBgImg = loadImage("bikeBackground.jpg");
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

  spawnBushes();
  window.setInterval(spawnBushes,2000);
}

function draw() {
  if (scene === "bikeGame") {
    bikeGame();
  }
  else if (scene === "iSpy") {
    iSpyGame();
  }
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
    // if (collide === true && keyCode === UP_ARROW) {
    //   text("AHHHHH", width/2, height/2);
    //   //scene = "iSpy";
    // }
      
  }
}

function bikeGame() {
  moveBushes();
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
  background(bikeBgImg);
  fill("pink");
  circle(biker.x, biker.y, biker.radius);
  line(width / 3, height, width / 3, 0);
  line(width / 3 * 2, height, width / 3 * 2, 0);
    
}

//bikeGame
function spawnBushes() {
  let someBush = {
    x: width/2,
    y: 0,
    speed: 3,
    radius: 40,
  };
  theBushes.push(someBush);
}

//bikeGame
function displayBushes() {
  for (let bush of theBushes) {
    // make it go through this once, not every frame, call from setup?
    // let choice = random(90);
    // if (choice > 60 ) {
    //   bush.x -= width/3;
    // }
    // else if (choice > 30) {
    //   bush.x += width/3;
    // }

    fill("green");
    circle(bush.x, bush.y, bush.radius * 2);
  }
}

//bikeGame
function bikeGameRules() {
  for (let bush of theBushes) {
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
      scene = "iSpy";
    }

  }
}

//bike Game
function moveBushes() {
  for (let bush of theBushes) {
    bush.y += bush.speed;
  }
}

//iSpy Game
function displayiSpy() {
  //background(iSpyBgImg)
  background(220);
  text("hiii" ,width/2,height/2);

}

//iSpy Game
function placeItems() {
  //randomly place 4 items to find based on a grid system
}