import { FoodEffect, OutsideTheBoard, PoisonEffect, SnakeBodyCollide, Win } from "./interactions.js";
import { SetBoard,speed } from "./board.js";
import { PlaceFood,PlacePoison,PlaceSnakeHead,SnakeMove,PoisonMove, Poison } from "./objects.js";
SetBoard()
PlaceFood()
PlacePoison()
PlaceSnakeHead()



setInterval(function()
{   SnakeBodyCollide()
    FoodEffect()
    PoisonEffect()
    OutsideTheBoard()
    Win()
    SnakeMove()
},speed);

setInterval(function(){
    PoisonMove()
},Poison.speed)