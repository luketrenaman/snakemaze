interface Sprite extends PIXI.Sprite{
    setTexture:Function;
}
interface Container extends PIXI.Container{
    zIndex:number;
    zOrder:number;
    updateLayersOrder:Function;
}
interface DifficultyConfig{
    long:number,
    medium:number,
    short:number,
    tickrate:number,
    name:string,
    color:string,
    value:number
}
interface globalController{
    soundManager:any;
    all:Container;
    stage:Container;
    renderer:any; //good
    newLevel:Function;
    maze:any; //CLARIFY
    level:any; //CLARIFY 
    manager:any; //CLARIFY
    difficulty:DifficultyConfig;
    save:any;
}
declare var g: globalController;
declare var WebFont: any;