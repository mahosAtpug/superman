class Superman {
    constructor (){
        this.sprite = createSprite(200,300);
        this.sprite.shapeColor = "white"
        // this.sprite.debug = true;
        this.sprite.setCollider("rectangle",0,0,this.sprite.width- 150, this.sprite.height)
    }
    control (){
        if (keyIsDown(DOWN_ARROW)){
           this.sprite.y+=3;
        }
        if (keyIsDown(UP_ARROW)){
            this.sprite.y-=3;
        }
        
        if (keyIsDown(RIGHT_ARROW)){
            this.sprite.x+=7;
        }
    }
    shoot (){
       var bullet = createSprite(this.sprite.x+70,this.sprite.y-90, 40,3);
       bullet.shapeColor = "red";
       bullet.velocityX= 10;
       laserGroup.add(bullet);
       bullet.lifetime=500;
    } 
    
}