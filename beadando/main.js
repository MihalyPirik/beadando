import { FoodEffect, OutsideTheBoard, PoisonEffect, SnakeBodyCollide, Win } from "./interactions.js";
import { SetBoard,speed } from "./board.js";
import { PlaceFood,PlacePoison,PlaceSnakeHead,SnakeMove,PoisonMove, Poison } from "./objects.js";
SetBoard()
PlaceFood()
PlacePoison()
PlaceSnakeHead()


setInterval(function()
{
    Win()
    SnakeMove()
    FoodEffect()
    SnakeBodyCollide()
    OutsideTheBoard()
    PoisonEffect()
},speed);

setInterval(function(){
    PoisonMove()
},Poison.speed)