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
// - mazeGame (stolen code !)
// - House
// - Witch
// iSpy

//images
let startImg;
let bikeBgImg;
let bikerImg;
let bushImg;
let crashImg;
//let bushTextureImg;

//bike game
let theBushes = [];
let collide = false;
let biker = {
  x: width / 2,
  y: height / 5 * 4,
  radius: 50,
};

//iSpy

//mazeGame
// var z,x,y;
// var wallArray=[];
// var lastGoodX = 0;
// var lastGoodY = 0;
// var lastGoodZ = 0;
// var camAngle;
// let bCam;
// var dx,dz;
// let graphics, graphics2;

function preload() {
  //startImg = loadImage("start.png");
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
  //bushTextureImg = loadImage("bush-texture");
}
function setup() {
  createCanvas(width, height);

  spawnBushes();
  window.setInterval(spawnBushes, 500);
}

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

function homeScreen() {
  background(142,242,111);
  //make even
  //title
  rect(50,50,300,100);
  //start button
  rect(50,180,300,100);
  //rules
  text('use the left and right arrow keys to move your character. Be careful not to crash into the bushes!', 50,310,350,385);
  //rect(50, 310, 300,75);
  //video 
  rect(50,400,300,175);
  //image(startImg, 50, 200, 300 ,90);
  if (mouseIsPressed === true && mouseX > 50 && mouseX < 350 && mouseY > 200 && mouseY < 300) {
    scene = "bikeGame";
  }
  //add like how to play and stuff
}
function bikeGame() {
  moveBushes();
  displayBike();
  displayBushes();
  bikeGameRules();
}

function iSpyGame() {
  cursor("cursor.png");
  displayiSpy();
  placeItems();
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
function displayiSpy() {
  //background(iSpyBgImg)
  background(220);
  text("hiii" ,width/2,height/2);

}

//iSpy Game
function placeItems() {
  //randomly place 4 items to find based on a grid system
}

//ispy code stuf
// let grid;
// let cellSize;
// const GRID_SIZE = 15;

// function setup() {
// createCanvas(400,600);
//   cellSize = height/GRID_SIZE;

//   grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
// }

// function windowResized() {
//   if ( windowWidth < windowHeight) {
//     resizeCanvas(windowWidth, windowWidth);
//   }
//   else {
//     resizeCanvas(windowHeight, windowHeight);
//   }
//   cellSize = height/GRID_SIZE;
// }

// function draw() {
//   background(12,23,53);
//   displayGrid();

// }

// function mousePressed() {
// }


// function displayGrid() {
//   for (let y = 0; y < GRID_SIZE; y++) {
//     for (let x = 0; x < GRID_SIZE; x++) {
//       if (grid[y][x] === 1) {
//         //image 1
//         fill("green");
//       }
//       else if (grid[y][x] === 2) {
//         //image 2
//         fill("red");
//       }
//       else if (grid[y][x] === 3) {
//         //image 3
//         fill("blue");
//       }
//       else if (grid[y][x] === 4) {
//         //image 4
//         fill("pink");
//       }
//       else if (grid[y][x] === 0) {
//         fill(0, 0, 0, 0);
//       }
//       noStroke();
//       square(x * cellSize , y * cellSize , cellSize);
//     }
//   }
// }

// function generateRandomGrid(cols, rows){
//   let newGrid = [];
//   for (let y = 0; y < rows; y++) {
//     newGrid.push([]);
//     for (let x = 0; x < cols; x++) {
//       //make 4 coloured squares
//       let x1 = Math.floor(random(width)/cellSize);
//       let y1 = Math.floor(random(height)/cellSize);
//       let x2 = Math.floor(random(width)/cellSize);
//       let y2 = Math.floor(random(height)/cellSize);
//       let x3 = Math.floor(random(width)/cellSize);
//       let y3 = Math.floor(random(height)/cellSize);
//       let x4 = Math.floor(random(width)/cellSize);
//       let y4 = Math.floor(random(height)/cellSize);
//       //pick a random number between 0 and width, 0 and height
//       // place square there
//       // if 1 x and 1 y === 2x and 2y then redraw or smth
//       //let x = Math.floor(x1/cellSize);
//       //let y = Math.floor(y1/cellSize);
//     if (x1 >= 0 && x1 < GRID_SIZE && y1 >=0 && y1 < GRID_SIZE) {
//       grid[y][x] = 1;
//     }
//        if (x2 >= 0 && x2 < GRID_SIZE && y2 >=0 && y2 < GRID_SIZE) {
//       grid[y][x] = 2;
//     }
//        if (x3 >= 0 && x3 < GRID_SIZE && y3 >=0 && y3 < GRID_SIZE) {
//       grid[y][x] = 3;
//     }
//        if (x4 >= 0 && x4 < GRID_SIZE && y4 >=0 && y4 < GRID_SIZE) {
//       grid[y][x] = 4;
//     }
//     }
//   }
//   return newGrid;

// }


//MZE CODE
// //Luca Del Priore MMP 310
// //simple 3D maze game


// function setup() {
//   createCanvas(windowWidth, windowHeight,WEBGL);
//   y=0;
//   x=0;
//   z=0;
//   //sign graphics
// graphics = createGraphics(800,400);
//   graphics2 = createGraphics(420,400);

// //bcam is a birds eye view that helps when placing blocks  
//   bCam = createCamera();
//     bCam.setPosition(0,-3000,200);
// //cam is the player camera
//    cam = createCamera();
//   cam.setPosition(-400,0,800);
  
  
//   //maze creation
//   //wallArray.push(new wall(0,0,0));
//   wallArray.push(new wall(400,0,400));
//   wallArray.push(new wall(400,0,800));
//   wallArray.push(new wall(0,0,1200));
//   wallArray.push(new wall(-400,0,1200));
//   wallArray.push(new wall(-400,0,0));
//   wallArray.push(new wall(0,0,-400));
//   wallArray.push(new wall(800,0,0));
//   wallArray.push(new wall(800,0,-400));
//   wallArray.push(new wall(800,0,-800));
//   wallArray.push(new wall(400,0,-1200));
//   wallArray.push(new wall(400,0,-1600))
//   for(let i=0;i<3;i++){
//     wallArray.push(new wall(400-400*i,0,-1200));
//     wallArray.push(new wall(-800,0,800-400*i));
//     wallArray.push(new wall(-800,0,400-400*i))
//     wallArray.push(new wall(-1200,0,-800-400*i));
//     wallArray.push(new wall(-800+400*i,0,-2000));
//   }

// }

// function draw() {
//  background("blue");
  
//   //start sign creating a sign for the game start
//   push();
//   noStroke();
//   translate(-400,0,550);
//   texture(graphics);
//   graphics.background(84, 80, 72);
//   graphics.fill(5);
//   graphics.textAlign(CENTER);
//   graphics.textSize(50); 
//   graphics.text('Use "wasd" to',400,150);
//   graphics.text('walk and',420,200);
//   graphics.text('left and right arrow to look',420,250);
//   graphics.text('Find the Gem',420,380);
//   plane(200,100);
//   pop();
  
//   //creating a sign for the game end
//   push();
//   noStroke();
//   translate(0,0,-1600);
//   rotateY(-PI/2);
//   texture(graphics2);
//   graphics2.background(84, 80, 72);
//   graphics2.textAlign(CENTER);
//   graphics2.textSize(50); 
//   graphics2.text('You found the gem',200,50);
//   plane(220,200);
//   pop();

//  //maze building camera
//    bCam.lookAt(0,0,0);
//    //setCamera(bCam);
  
 
// frameRate(60);
//     x =0;
//     z =0;
//   camAngle=0;
//   //player "flash light"
//   pointLight(200, 200, 200, cam.eyeX, -200, cam.eyeZ);
//   ambientLight(5);
  
//   //creating the gem
//   push();
//   noStroke();
//   translate(0,0,-1600);
//   specularMaterial(0, 255, 187);
//   shininess(1000);
//   rotateY(millis()/500);
//   rotateX(millis()/523);
//   sphere(50,16 ,3);
//   pop();
 

//   var anyTouching = false;
//   //displays all blocks in an array
//  for (let i=0; i<wallArray.length; i++){
//    wallArray[i].display();
//    //tests if the wall class is touching the camera
//    if(wallArray[i].touching()){
//          anyTouching=true;
//    }
//  }
//   //saves the last "safe" player location to return the player to.
//   if(anyTouching==false){

//     lastGoodX=(cam.eyeX);
//     lastGoodY = cam.eyeY;
//     lastGoodZ=(cam.eyeZ);
//       //console.log(lastGoodX+" "+lastGoodZ);
//   }
  

// //wasd controls for strafing
//     if(keyIsDown(83)){
//      z=10;      
//      }
  
//    if(keyIsDown(87)){
//      z=-10;              
//     }
  
//    if(keyIsDown(65)){
//      x=-10;                           
//    }
  
//    if(keyIsDown(68)){
//      x=10;                             
//     }

//  //puts player back to last place not touching a wall 
// if(anyTouching==true){
//       cam.setPosition(lastGoodX,lastGoodY,lastGoodZ);
//       //console.log("touching");
      
//       //set to last safe position

//     }
// //looking side to side controls  
//     if(keyIsDown(37)){
//      camAngle=0.05;                             
//     }
//      if(keyIsDown(39)){
//      camAngle=-0.05;                             
//     }
//   //mouse would often leave the player stuck
//     //cam.pan(movedX*-0.01);
//     cam.pan(camAngle);
//   //cam.tilt(movedY*0.01);
//     cam.move(x,0,z);
//  // console.log(cam.eyeZ);
// }

