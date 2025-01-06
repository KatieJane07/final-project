// CompSci30 final
// Katie Strawson
// date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//canvas and display
let width = 400;
let height = 600;
let scene = "homeScreen";
// bikeGame
// crash
// - Cat
// - Outside
// - mazeGame 
// - House
// - Witch
// iSpy

//images
let startImg;
let titleImg;
let rulesImg;
let arrows;
let bikeBgImg;
let bikerImg;
let bushImg;
let crashImg;


//bike game
let theBushes = [];
let collide = false;
let biker = {
  x: width / 2,
  y: height / 5 * 4,
  radius: 50,
};

//iSpy
let grid;
let cellSize;
let iSpyLives = 3;
let newGrid;
const GRID_SIZE = 15;


function preload() {
  startImg = loadImage("start.png");
  titleImg = loadImage("bikeGameTitle.jpg");
  rulesImg = loadImage("bikeGameRules.jpg");
  arrows = loadImage("arrows.gif");
  //bike game
  bikeBgImg = loadImage("bikeBackground.jpg");
  bikerImg = loadImage("biker.png");
  bushImg = loadImage("bush.png");
  crashImg = loadImage("crash.jpg");

  //ispy
  //ispy bg
  //finditem1
  //finditem2
  //finditem3
  //finditem4

  //mazeGame
  
}

function setup() {
  createCanvas(width, height);
  //bush game
  spawnBushes();
  window.setInterval(spawnBushes,650);

  //iSpy Game
  cellSize = height / GRID_SIZE;
  grid = iSpyGrid(GRID_SIZE, GRID_SIZE);
}

//
function draw() {
  if (scene === "homeScreen") {
    homeScreen();
  }

  if (scene === "bikeGame") {
    bikeGame();
  }

  if (scene === "crash") {
    background(crashImg);
    if (keyIsPressed && keyCode === 32) {
      scene = "iSpy"; //cutscene actually
    }
  }

  if (scene === "iSpy") {
    iSpyGame();
  }
}

//
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

//HomeScreen
function homeScreen() {
  background(12, 205, 210);
  //title
  rect(50,50,300,100);
  //start
  rect(50,180,300,100);
  image(titleImg, 50, 50);
  image(rulesImg, 50, 310);
  
  //rules
  
  //rect(50, 310, 300,75);
  //rect(50,400,300,175);
  image(arrows, 50, 400);
  noStroke();
  fill(12, 205, 210);
  rect(262,552,88,20);
  image(startImg, 50, 200, 300 ,90);
  if (mouseIsPressed === true && mouseX > 50 && mouseX < 350 && mouseY > 200 && mouseY < 300) {
    scene = "bikeGame";
  }
}

//bikeGame
function bikeGame() {
  moveBushes();
  displayBike();
  displayBushes();
  bikeGameRules();
}

//bikeGame
function displayBike() {
  background(bikeBgImg);
  imageMode(CENTER);
  image(bikerImg, biker.x, biker.y, 100, 100);
  imageMode(CORNER);
  // fill("pink");
  // circle(biker.x, biker.y, biker.radius);
  line(width / 3, height, width / 3, 0);
  line(width / 3 * 2, height, width / 3 * 2, 0);
    
}

//bikeGame
function spawnBushes() {
  if (scene === "bikeGame") {

    let someBush = {
      x: width/2,
      y: 0,
      speed: 7,
      radius: 40,
      choice: int(random(3)),
    };
    if (someBush.choice === 0) {
      someBush.x -= width/3;
    }
    else if (someBush.choice === 1) {
      someBush.x += width/3;
    }
    else if (someBush.choice === 2) {
      someBush.x = width/2;
    }
    theBushes.push(someBush);
  }
}

//bikeGame
function displayBushes() {
  for (let bush of theBushes) {
    imageMode(CENTER);
    image(bushImg, bush.x, bush.y, 130, 130);
    imageMode(CORNER);
    // fill("green");
    // circle(bush.x, bush.y, bush.radius * 2);
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
      scene = "crash";
      //scene = "iSpy";
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
function iSpyGame() {
  //cursor tb moved
  cursor("cursor.png");
  displayiSpy();
}

//iSpy Game
function displayiSpy() {
  //background(iSpyBgImg)
  showItems();
  fill("white");
  text(iSpyLives, 50,50);
}

//iSpy Game
function iSpyGrid(cols, rows) {
  newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));

  // Place four random squares with unique colors
  for (let color = 1; color <= 8; color++) {
    let x, y;
    do {
      x = Math.floor(random(cols));
      y = Math.floor(random(rows));
      if (newGrid[y][x] !== 0) {
        newGrid[y][x] = color;
      }
    } while (newGrid[y][x] !== 0); // Ensure the spot is empty
    newGrid[y][x] = color;
  }

  return newGrid;
}

//iSpy Game
function showItems() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill("green");
      } 
      else if (grid[y][x] === 2) {
        fill("red");
      } 
      else if (grid[y][x] === 3) {
        fill("blue");
      } 
      else if (grid[y][x] === 4) {
        fill("pink");
      } 
      else if (grid[y][x] === 5) {
        fill("slateblue");
      } 
      else if (grid[y][x] === 6) {
        fill("rebeccapurple");
      } 
      else if (grid[y][x] === 7) {
        fill("aliceblue");
      } 
      else if (grid[y][x] === 8) {
        fill("lime");
      } 
      else {
        fill(0, 0, 0, 0); // Transparent for empty cells
      }
      noStroke();
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

//
function mousePressed() {
  if (scene === "iSpy") {
    let x = Math.floor(mouseX/cellSize);
    let y = Math.floor(mouseY/cellSize);
    
    toggleCell(x,y);
  }
}

//iSpy Game
function toggleCell(x,y) {
  if (x >= 0 && x < GRID_SIZE && y >=0 && y < GRID_SIZE) {
    if (newGrid[y][x] === 0) {
      iSpyLives -= 1;
    }
    else {
      newGrid[y][x] = 0;
    }
  }
}



