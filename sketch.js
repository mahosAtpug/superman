var superman , enemyGroup, startButton , startButtonImg;
var laserGroup;
var youWin,youWinImg;
var kryptoniteImg , kryptonite;
var gameOver , gameOverImg;
var supermanImg, skyImg, boss1, boss2;
var edges;
var gameState=0;
var life = 10;
var enemyX = 1000 ;
var laserShoot,laserShootSound,hitPlayerSound,enemyHitSound;


function preload(){
  supermanImg=loadImage("images/Super.png");
  skyImg=loadImage("images/sky.png");
  boss1=loadImage("images/Boss1.png");
  boss2=loadImage("images/Boss2.png");
  startButtonImg=loadImage("images/startButton.png");
  gameOverImg=loadImage("images/gameOver.png");
  kryptoniteImg=loadImage("images/goal.png");
  youWinImg=loadImage("images/youwin.png");
  laserShootSound=loadSound("images/laserShoot.mp3");
  hitPlayerSound=loadSound("images/hitPlayer.mp3");
  enemyHitSound=loadSound("images/enemyHit.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  superman = new Superman();
  superman.sprite.addImage(supermanImg);


  enemyGroup = new Group ();
  laserGroup = new Group();

  startButton= createSprite(width/2,height/2+100);
  startButton.addImage(startButtonImg);

  gameOver= createSprite(300,400);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  startButton.scale=0.5

  kryptonite=createSprite(6000,height/2);
  kryptonite.addImage(kryptoniteImg);

  youWin=createSprite(500,400);
  youWin.addImage(youWinImg);
  youWin.visible=false;

  
}

function draw() {

  background("#91D5ED");
  image (skyImg,-480,0,displayWidth*11, displayHeight);

  if (gameState === 0){
    textSize(100);
    fill ("#2E7CBB")
    stroke ("#76CCD4")
    // fontStyle (BOLD);
    text ("Superman Montage  ", width/2-430, height/2);
    superman.sprite.visible = false;
    if (mousePressedOver(startButton)){
      gameState = 1;
      
    }
  }

  if (gameState ===1 ){
      startButton.visible = false;
      superman.sprite.visible = true;
      // edges = createEdgeSprites();
      // superman.sprite.collide(edges[2]);
      // superman.sprite.collide(edges[3]);
      camera.position.x = superman.sprite.x;

      if (keyWentDown(32)){
        superman.shoot();
        laserShootSound.play();
      }
      if (life<=0){
        gameState=2;
      }
      for (var i = 0 ; i<laserGroup.length ; i++){
        for (var j = 0 ; j<enemyGroup.length ; j++){
          if (laserGroup.isTouching(enemyGroup.get(j))){
            laserGroup.get(i).destroy()
            enemyGroup.get(j).destroy();
            enemyHitSound.play();
          }
        }

      }

      textSize (40)
      text("Superman's Life:" + life, camera.position.x+150 , 50);

      for (var k = 0 ; k<enemyGroup.length ; k++){
        if (superman.sprite.isTouching(enemyGroup)){
          life -= 1
          enemyGroup.get(k).destroy();
          hitPlayerSound.play();
        }
        }
        if (superman.sprite.isTouching(kryptonite)){
          gameState=3;
        }

      spawnEnemies();
      superman.control();
  }
  
  if (gameState===2){
    superman.sprite.visible=false;
    enemyGroup.destroyEach();
    gameOver.visible=true;
    gameOver.x = camera.position.x;
    gameOver.y=camera.position.y;
    laserGroup.destroyEach();
    kryptonite.visible=false;

  }

  if (gameState===3){
    superman.sprite.visible=false;
    enemyGroup.destroyEach();
    youWin.visible=true
    youWin.x = camera.position.x;
    youWin.y=camera.position.y;
    laserGroup.destroyEach();
    kryptonite.visible=false;
  }
  drawSprites();
}

function spawnEnemies(){
  if (frameCount % 10 === 0 ){
    var rando = Math.round(random(100,height-100));
    var enemy = createSprite (enemyX,rando,5,30);
    enemy.velocityX = -3
    enemyX=enemyX+500;

    var rand = Math.round(random(1,2));
    switch(rand) {
    case 1: enemy.addImage(boss1);
    break;

    case 2:enemy.addImage(boss2);
    break;

    default: break;
  }
  enemy.lifetime = 1000;
  enemy.scale = 0.5;
  enemyGroup.add(enemy);
}
}