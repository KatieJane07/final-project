// CompSci30 final
// Katie Strawson
// date
//
// Extra for Experts:
// - videos
// - cursor
// - click sound
// - combination of arrays and state variables and other things
// - mostly just combining a bunch of different things we learned in class into one complicated version

//canvas and display
let width = 400;
let height = 600;
let scene = "homeScreen";
// "homeScreen"
// "bikeGame"
// "crash"
// "houseCutScene"
// "choicesOne"
// "choicesTwo" 
// "witchCutScene"
// "iSpy"
// "catLove"
// "endingTwo"

//images
let startImg;
let titleImg;
let rulesImg;
let arrows;
let bikeBgImg;
let bikerImg;
let bushImg;
let crashImg;

//videos
let videoOne;
let playedOne = false;
let videoTwo;
let playedTwo = false;

//noises
let click;
let bgmusic;

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
  //other
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
  //backgroundone
  //backgroundtwo
  
  //videos
  videoOne = createVideo("catVid.mov")
  videoOne.hide();
  videoTwo = createVideo("catLove.mov")
  videoTwo.hide();
  
  //noises
  click = loadSound("click.mp3");
  bgmusic = loadSound("background.mp3");
}

function setup() {
  createCanvas(width, height);

  //music
  bgmusic.play();
  bgmusic.loop();

  //bush game
  spawnBushes();
  window.setInterval(spawnBushes,650);

  //iSpy game grid set up
  cellSize = width/15;
  grid = iSpyGrid(10, 15);
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
    crashScene();
    image(videoOne, 0, 0, 400, 600);
  }

  if (scene === "videoOne") {
    background('aliceblue');
    fill('black');
    text("click anywhere to continue", 145, 570);
    text("oh no im a cat what do i do", 40, 100);
  }

  if (scene === "videoTwo") {
    background('aliceblue');
    fill('black');
    text("click anywhere to continue", 145, 570);
    text("a witch? oh she says she can make me human again... i accept! i just need to gather a few more things..." ,50, 100,350,500);
  }

  if (scene === "choicesOne") {
    choiceOne();
  }

  if (scene === "choicesTwo") {
    choiceTwo();
  }

  if (scene === "iSpy") {
    iSpyGame();
  }

  if (scene === "catLove") {
    background('aliceblue');
    fill('black');
    text("click anywhere to continue", 145, 570);
    text("oh another cat maybe being a cat isnt so bad after all...", 50, 100,350,500);
    image(videoTwo, 0, 0, 400, 600);
  }

  if (scene !== "homeScreen" && scene !== "bikeGame") {
    cursor("cursor.png");
  }
}

//
function keyPressed() {
  if (scene === "bikeGame") {
    //biker movement
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

//
function mousePressed() {
  //mouse noise
  click.play();

  if (scene === "crash" && playedOne === false) {
    //plays video on click
    videoOne.play();
    playedOne = true;
  }

  else if (scene === "crash" && playedOne === true) {
    scene = "videoOne";
  }

  else if (scene === "videoOne") {
    scene = "choicesOne";
  }
  
  else if (scene === "choicesOne") {
    if (mouseX < 200) {
      scene = "choicesTwo";
    }
    else {
      scene = "videoTwo";
      //scene = "witchCutScene"; **
    }
  }

  else if (scene === "choicesTwo") {
    if (mouseY > 300) {
      scene = "videoTwo";
      //scene = "witchCutScene"; **
    }
    else {
      scene = "catLove";
    }
  }

  else if (scene === "catLove" && playedTwo === false) {
    videoTwo.play();
    playedTwo = true;
  }

  else if (scene === "catLove" && playedTwo === true){
    background('aliceblue');
    fill('black');
    text("click anywhere to continue", 145, 570);
    text("THE END", 200,300);
  }
  
  else if (scene === "videoTwo") {
    scene = "iSpy";
  }

  else if (scene === "iSpy") {
    let x = Math.floor(mouseX/cellSize);
    let y = Math.floor(mouseY/cellSize);
    
    toggleCell(x,y);
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
  //start button clicked
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
  //place bg
  background(bikeBgImg);
  //place biker
  imageMode(CENTER);
  image(bikerImg, biker.x, biker.y, 100, 100);
  imageMode(CORNER);
  //place lane lines
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
  }
}

//bikeGame
function bikeGameRules() {
  //biker and bush collision
  for (let bush of theBushes) {
    let distanceAway = dist(biker.x, biker.y, bush.x, bush.y);
    if (distanceAway < bush.radius) {
      collide = true;
    }
    else {
      collide = false;
    }
    if (collide === true) {
      scene = "crash";
    }
  }
}

//bike Game
function moveBushes() {
  for (let bush of theBushes) {
    bush.y += bush.speed;
  }
}

//crash
function crashScene() {
  background(crashImg);
  fill("black");
  textSize(20);
  text("click anywhere to continue", 145, 570);

}

//choices
function choiceOne() {
  background("green")
  fill("white");
  stroke(5);
  text('where should I go now?', 150, 80);
  line(200,0,200,600);
  text('left', 50,400);
  text('right', 350,400);
}

//choices
function choiceTwo() {
  background("pink")
  fill("white");
  stroke(5);
  text('where should I go now?', 150, 80);
  line(0,300,400,300);
  text('up', 100,100);
  text('down', 100,500);
}

//iSpy Game
function iSpyGame() {
  //background(iSpyBgImg) !!
  background(30,20,10);
  showItems();
  fill("blue");
  text(iSpyLives, 50,50);
  if (iSpyLives === 0) {
    //you lost screen
    //press space to continue
    //go to after cutscene1 (maze game?) !! **
  }

}

//iSpy Game
function iSpyGrid(cols, rows) {
  newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
  
  // places random items randomly
  for (let color = 1; color <= 8; color++) {
    let x, y;
    do {
      x = Math.floor(random(cols));
      y = Math.floor(random(rows));
      if (newGrid[y][x] !== 0) {
        newGrid[y][x] = color;
      }
    } 
    //checks if spot is empty before placing
    while (newGrid[y][x] !== 0); 
    newGrid[y][x] = color;
  }

  return newGrid;
}

//iSpy Game
function showItems() {
  //places items randomly
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
        // fill empty squares w transparent blocks
        strokeWeight(3);
      stroke("yellow");
        fill(0, 0, 0, 200); 
      }

      //noStroke();
      
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

//iSpy Game
function toggleCell(x,y) {
  if (x >= 0 && x < GRID_SIZE && y >=0 && y < GRID_SIZE) {
    if (newGrid[y][x] === 0) {
      iSpyLives -= 1;
      if (iSpyLives === 0) {
        scene = "choicesOne"
      }
    }
    else {
      //"collects" found items
      newGrid[y][x] = 0;
      //items remaining --
      checkEmpty();

    }
  }
  if (checkEmpty()) {
    scene = "catLove";
  }
}

//iSpy Game
function checkEmpty() {
// checks if each tile is empty !!
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (newGrid[y][x] > 0) {
        return false;
      }
    }
  }
  return true;
}


