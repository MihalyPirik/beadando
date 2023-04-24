import { FoodEffect, OutsideTheBoard, PoisonEffect, SnakeBodyCollide, Win } from "./interactions.js";
import { SetBoard,speed } from "./board.js";
import { PlaceFood,PlacePoison,PlaceSnakeHead,SnakeMove,PoisonMove } from "./objects.js";
SetBoard()
PlaceFood()
PlacePoison()
PlaceSnakeHead()


setInterval(function()
{
    Win()
    SnakeMove()
    // PoisonMove()
    FoodEffect()
    SnakeBodyCollide()
    OutsideTheBoard()
    PoisonEffect()
},speed)
import { FoodEffect, OutsideTheBoard, PoisonEffect, SnakeBodyCollide, Win } from "./interactions.js";
import { SetBoard,speed } from "./board.js";
import { PlaceFood,PlacePoison,PlaceSnakeHead,SnakeMove,PoisonMove } from "./objects.js";
SetBoard()
PlaceFood()
PlacePoison()
PlaceSnakeHead()


setInterval(function()
{
    Win()
    SnakeMove()
    // PoisonMove()
    FoodEffect()
    SnakeBodyCollide()
    OutsideTheBoard()
    PoisonEffect()
},speed)