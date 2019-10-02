import { Sprite } from "pixi.js";
import { Container } from "pixi.js";
interface globalController{
    all:PIXI.Container;
    stage:PIXI.Container;
    renderer:any; //good
    newLevel:Function;
    maze:any; //CLARIFY
    level:any; //CLARIFY 
    manager:any; //CLARIFY
}
declare var g: globalController;
declare var WebFont: any;

interface spr extends PIXI.Sprite{
    setTexture:Function;
}
interface ctr extends PIXI.Container{
    zIndex:number;
    zOrder:number;
}
interface PIXI{
   Sprite:spr;
   Container:ctr;
}