var PLAY= 1
var end= 0;
var gameState = PLAY;

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var score= 0;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;

  doorsGroup=new Group();
  climbersGroup=new Group();

  invisibleBlock = createSprite(300,550,550,10);
  invisibleBlock.visible= false;

}

function draw() {
  background(200);
  // textSize(20);
  // fill("white");
 // text("Score: " + score,30,50);

   if(gameState===PLAY){
     //score = score + Math.round(getFrameRate()/60);
     //tower.velicityY = -(4 + 3*100);

    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
    }

    if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
    }

    if(keyDown("space")){
    ghost.velocityY=-5;
    }

  ghost.velocityY= ghost.velocityY+0.8;
  ghost.collide(invisibleBlock);
  
  
    spawnDoors();


    if(doorsGroup.isTouching(ghost)){
      spookySound.play();
      gameState= END;

    }

   }
   else if (gameState===END){
    tower.VelocityY=0;
     ghost.VelocityY=0;
     doorsGroup.setVelocityYEach(0);
     climbersGroup.setVelocityYEach(0);
   }

drawSprites();
}

function spawnDoors() {
  if (frameCount%240==0){
    door= createSprite(200,-50);
    door.x=Math.round(random(120,400));
    door.addImage(doorImg);
    door.velocityY=1;
    
    climber= createSprite(200,10);
    climber.addImage(climberImg);
    climber.x=door.x;
    climber.velocityY=1;
    
    door.lifetime=800;
    climber.lifetime=800;
    
  doorsGroup.add(door);
  climbersGroup.add(climber);
}
  }