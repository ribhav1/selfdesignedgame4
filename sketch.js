var windowW, windowH;
var enterNameInput, playButton;
var playerName;

var player;
var asteriod;

var score = 0;
var scoreIncrease = 0;

var spawnSpeed = 30;

var gameState = 1;

var asteriodImg;

var p;
var pVel;
var force;
var pos;
var fDirection;
var fireColor;
var playerColor;
var touch;
var forcePush;

var bullet;
var playerX, playerY;

var bulletGroup, asteriodGroup;

var pCollider;

var score = 0;
var health = 25;

var angle;

function preload(){
    asteriodImg = loadImage("tAsteriod.png");
}

function setup(){
    windowW = windowWidth - 15
    windowH = windowHeight - 21

    createCanvas(windowW, windowH);
    
    p=createVector(width/2,height/2)
    pVel=createVector(0,0);
    force=createVector(0,0);
    pos = 10;
    fDirection = 0;
    angle = 0;

    if(gameState === 1){
        enterNameInput = createInput("Enter Username");
        enterNameInput.center();

        playButton = createButton("Play");
        playButton.position((windowW / 2) - (playButton.width / 2), (windowH / 2) + 20);    
    }

    player = new rocket();

    bulletGroup = new Group();
    asteriodGroup = new Group();
    
    pCollider = createSprite(798, 474, 30, 30);
}

function draw(){
    background(60);
    frameRate(200);

    pCollider.position.x = p.x;
    pCollider.position.y = p.y;

    pCollider.visible = false;
    pCollider.setCollider("rectangle", 0, 0, 30, 30);

    if(gameState === 1){
        playButton.mousePressed(()=>{
            gameState = 2;
            playerName = enterNameInput.value();
            console.log("gameState: " + gameState);
        });
    }
    if(gameState === 2){
        push();
        textSize(18);
        fill(255);
        text(playerName + "'s" + " Score: " + score, 50, 40);
        text("Health: " + health, 50, 60);
        pop();
        enterNameInput.hide();
        playButton.hide();
        player.display();
        player.movePlayer();
        spawnAsteriods();
        if(keyWentDown("space")){
            spawnBullets();
        }
        for(var i = 0; i < asteriodGroup.length; i++){
            if((asteriodGroup.get(i) !== undefined) && (pCollider !== undefined)){
                if(asteriodGroup.get(i).overlap(bulletGroup)){
                    asteriodGroup.get(i).remove();
                    score++;
                }
                if(asteriodGroup.get(i).overlap(pCollider)){
                    if(health > 0){
                        asteriodGroup.get(i).remove();
                        health--;
                        console.log(pCollider);
                    }
                }
                if(asteriodGroup.get(i).position.x > 0 && asteriodGroup.get(i).position.x < windowW){
                    if(asteriodGroup.get(i).position.y > windowH){
                        asteriodGroup.get(i).remove();
                        health--;
                    }
                }
            }
        }
        if(health === 0){
            gameState = 3;
        }
        drawSprites();
    }
    if(gameState === 3){
        fill(255);
        textSize(30);
        text(playerName + "'s" + " Final Score: " + score, (windowW / 2) - 200, windowH / 2);
    }
}

function spawnBullets(){
    bullet = createSprite(p.x, p.y, 10, 10);
    bullet.draw = function() { ellipse(0,0,10,10) } 
    bullet.life = 100;
    bullet.setSpeed(15, degrees(angle));
    bullet.addToGroup(bulletGroup);
    bullet.setCollider("rectangle", 0, 0, 10, 10);
}
function spawnAsteriods(){
    if(frameCount % 30 === 0){
    var randY = Math.round(random(-200, 0));
    var randX = Math.round(random(0, windowW));
    var randDirection = Math.round(random(45, 135));
    asteriod = createSprite(randX, randY, 10, 10);
    asteriod.addImage(asteriodImg);
    asteriodImg.resize(100, 70);
    asteriod.setSpeed(4, randDirection);
    if(randDirection > 90){
        asteriod.rotation = randDirection - 30;
    }
    asteriod.life = 400;
    asteriod.addToGroup(asteriodGroup);
    asteriod.setCollider("circle", 0, 0, 40);
    }
}
function mousePressed() {
   spawnBullets();
}