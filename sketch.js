var bgImg, bg, ground
var spidermanimg, spiderman, spidermanJumpimg, spidermanStill, gameOver, venomStop
var venomimg, obstaclev, greengimg, obstacleGG, obstaclegroup, gamestate
var score = 0


function preload(){
 bgImg = loadAnimation("bg2.gif")
 spidermanimg = loadAnimation("spiderman.gif")
  spidermanJumpimg = loadAnimation("jump.gif")
  venomimg = loadAnimation("venom.gif")
  greengimg = loadAnimation("greengoblin.gif")
  spidermanStill = loadAnimation("spiderman-1.png")
  gameOver = loadAnimation("bg2-1.png")
  venomStop = loadAnimation("venom-1.png")
}

function setup(){
  createCanvas(700,300)
  bg = createSprite(350,150)
  bg.addAnimation("moving", bgImg)
  bg.addAnimation("still", gameOver)
  bg.scale = 1.4

  spiderman = createSprite(45,220, 10,10)
  spiderman.addAnimation("running", spidermanimg)
  spiderman.addAnimation("Stop", spidermanStill)
  spiderman.scale = .4
  spiderman.debug = "true"
  spiderman.setCollider("circle", 0, 0, 120)

  ground = createSprite(350,290, 700, 20)
  ground.visible = false

  obstaclegroup = createGroup()
  gamestate = "play"
}

function draw(){
  background("blue")
 // console.log(spiderman.y)
  if(gamestate === "play"){
    score = score+Math.round(frameCount/100)
    if(keyDown("space")&& spiderman.y>100){
      spiderman.velocityY = -10
    }
    spiderman.velocityY = spiderman.velocityY +.8
    spawnObstacles()
    if(obstaclegroup.isTouching(spiderman)){
      gamestate = "end"
    }
    
  }
  else if(gamestate === "end"){
    spiderman.velocityY = 0
    spiderman.changeAnimation("Stop")
    obstaclegroup.setVelocityXEach(0)
    bg.changeAnimation("still")
    bg.scale = 1.4
    obstaclev.changeAnimation("done")
  }
 
  spiderman.collide(ground)
  drawSprites()
  textSize(30)
  fill("white")
  text("score - - " + score, 300, 30)
  text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);
  
}
function spawnObstacles(){
  if(frameCount % 280 === 0){
    obstaclev = createSprite(650,230,20,20)
    obstaclev.addAnimation("crawling", venomimg)
    obstaclev.addAnimation("done", venomStop)
    obstaclev.velocityX = -3
    obstaclev.scale = .4
    obstaclegroup.add(obstaclev)
    
  }
  if(frameCount % 500 === 0){
    obstacleGG = createSprite(670,30,20,20)
    obstacleGG.addAnimation("flying", greengimg)
    obstacleGG.velocityX = -3
    obstacleGG.velocityY = 2
    obstacleGG.scale = .8
    obstaclegroup.add(obstacleGG)
  }


}