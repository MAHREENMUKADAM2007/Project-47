var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg;
var zombieGroup, bullet, bulletImage;
var heatImg1 , heartImg2 , heartImg3;
var heart1,heart2,heart3;
var gameOverImage , gameOver;
var restart , RestartImg
var YouWin , YouWinImg
var explosion , win , lose
var gameState= "Play1"
var score = 0
function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  bulletImage= loadImage("assets/bulletImage.jpg")
  heartImg1 = loadImage("assets/heart_1.png")
  heartImg2 = loadImage("assets/heart_2.png")
  heartImg3 = loadImage("assets/heart_3.png")
  gameOverImage = loadImage("assets/GO.jpg")
  explosion = loadSound("assets/explosion.mp3")
  win = loadSound("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
  YouWinImg = loadImage("assets/YouWin.jpg")
  RestartImg = loadImage("assets/Restart.jpg")
  
}

function setup() {



  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  heart1 = createSprite(displayWidth-150,40)
  heart1.addImage(heartImg1)
  heart1.visible = false
  heart1.scale = 0.4
  heart2 = createSprite(displayWidth-100,40)
  heart2.addImage(heartImg2)
  heart2.visible = false
  heart2.scale = 0.4
  
  heart3 = createSprite(displayWidth-150,40)
  heart3.addImage(heartImg3)
  heart3.scale = 0.4
 
  restart = createSprite(50,50)
  restart.addImage(RestartImg)
  restart.visible=false

  gameOver  = createSprite(650,350)
  gameOver.addImage(gameOverImage)
  gameOver.visible=false
  
  YouWin = createSprite(650,350)
  YouWin.addImage(YouWinImg)
  YouWin.visible=false

  zombieGroup=new Group()
  bulletGroup = new Group()

}

function draw() {
  background(0);


  spawnZombie();


  

  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {
    spawnBullet();
    player.addImage(shooter_shooting)

  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }

  if(bulletGroup.isTouching(zombieGroup)){
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        explosion.play()
        score+=10
      }
    }
  }
  if(gameState==="Play1"){
    if(zombieGroup.isTouching(player)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
          heart1.visible = false
          heart2.visible = true
          heart3.visible = false
          gameState = "Play2"
          lose.play()
        }
      }
    }
  }
  
  if(gameState==="Play2"){
    if(zombieGroup.isTouching(player)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
          heart1.visible = true
          heart2.visible = false
          heart3.visible = false
          gameState = "Play3"
          lose.play()
        }
      }
    }
  }
  
  if(gameState==="Play3"){
    if(zombieGroup.isTouching(player)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
          heart1.visible = false
          heart2.visible = false
          heart3.visible = false
          gameState = "End"
          lose.play()
        }
      }
    }
  }

  if(gameState==="End"){
    bg.visible=false
    background(0)
    gameOver.visible=true
    gameOver.scale=3
    zombieGroup.destroyEach()
    player.destroy();
    restart.visible=true
    bulletGroup.destroyEach();
    restart();
  }
  
  if(score>=10){
    gameState = "win"
    win.play()
  }
  
  if(gameState==="win"){
    bg.visible=false
    background(0)
    YouWin.visible=true
    YouWin.scale=2
    zombieGroup.destroyEach()
    player.destroy();
    restart.visible=true
    bulletGroup.destroyEach();
    if(mousePressedOver(restart)){
      restartGame()
    }
  }

  



  drawSprites();
  textSize(20)
  fill("yellow")
  text("Score: "+score, 50,50)

  // "Hello" + "world"=concatenation
}
function spawnZombie() {
  if (frameCount % 120 === 0) 
  {
    zombie=createSprite(random(500,1100),random(100,500))
    zombie.scale=0.15
    zombie.addImage(zombieImg)
    zombie.velocityX = -2
    zombie.lifetime=400
    zombieGroup.add(zombie)
    zombie.debug=true;
    zombie.setCollider("rectangle",0,0,400,1000)

  }
}

function spawnBullet(){
  bullet=createSprite(player.x,player.y,18,18)
  bullet.velocityX= 3
  bulletGroup.add(bullet)
  bullet.scale = 0.1
  bullet.addImage(bulletImage)
  
}

function restartGame(){
  gameState="Play1"
  console.log('its working')
  YouWin.visible=false;
}


