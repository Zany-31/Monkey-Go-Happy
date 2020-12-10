
var monkey , monkey_running, ground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  //createCanvas(600,600);
  monkey = createSprite (80,315,20,20);
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.15;
  ground = createSprite(400,350,900,10);
ground.velocityX = -4;
  ground.x = ground.width/2;
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  score = 0;
  
}


function draw() {
background("skyblue");
  //infinite scrolling effect
  if(ground.x<0){
  ground.x = ground.width/2;   
     }
  //press space to make the monkey jump
  if(keyDown("space")){
    monkey.velocityY = -6;
    
  }
  //add gravity to the monkey
  monkey.velocityY = monkey.velocityY+0.8;
  //makes the monkey collide with the ground
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score+1
  }
  drawSprites()
  stroke("black"); 
  textSize(20);
  fill("black");
  text("Score: "+ score, 10,50); 
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  } 
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50);
  
  
}
function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    //add image of banana
    banana.addImage(bananaImage);
    banana.scale=0.07; 
    //add each banana to the group
    foodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    //add image to the obstacle
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15; 
    //lifetime to the obstacle
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  } 
}





