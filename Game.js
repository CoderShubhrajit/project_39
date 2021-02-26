class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      ship1 = createSprite(300,200);
      ship1.addImage(shipImage1);

      ship2 = createSprite(1000,200);
      ship2.addImage(shipImage2);
      ships = [ship1,ship2];
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      image(backImage,0,-(displayHeight*4),displayWidth,displayHeight*5);
      var index = 0;
      var x = 0;
      var y;
      //var display_position = 130;
      for(var plr in allPlayers){
        index++;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        ships[index-1].x = x;
        ships[index-1].y = y;

        if(index===player.index)
        {
          ships[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2; 
          camera.position.y = ships[index-1].y;  
          //console.log(ships[index-1].y);     
        }
        /*if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");*/

        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance>4000){
      gameState = 2;
    }
    drawSprites();
  }
  end()
  {
    text("Race over !",displayWidth/2,displayHeight/2);
  }
}
