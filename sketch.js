var backImage;
var ship1,ship2,shipImage1,shipImage2;
var ships = [];

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

function preload()
{
  backImage = loadImage("space.png");
  shipImage1 = loadImage("spaceShip1.png");
  shipImage2 = loadImage("spaceShip2.png");
}

function setup()
{
  createCanvas(displayWidth-20,displayHeight-30);

  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw()
{
  background("lightblue");

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    background("lightblue");
  }

  if(gameState === 2){
    clear();
    game.end();
  }

  drawSprites();
}