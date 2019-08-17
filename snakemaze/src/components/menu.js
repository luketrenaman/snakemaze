class menuManager{
    constructor(){
        this.menus = []
    }
    show(menuName){
        this.hide();
        this.menus.forEach(function(val){
            if(val.name === menuName){
                val.visible = true;
                g.soundManager.visible = val.sound;
            }
        })
        g.renderer.render(g.all);
    }
    hide(){
        this.menus.forEach(function(val){
            val.visible = false;
        })
    }
    push(val){
        this.menus.push(val);
    }
}
class menu extends PIXI.Container{
    constructor(name,sound){
        super()
        this.name = name;
        this.sound = sound;
        g.manager.push(this);
        g.all.addChild(this);
    }
}
import shapes from "../drawing/shapes.js";
import button from "./button.js";
export default function(){
    g.manager = new menuManager();
    // -- HANDLE MUSIC --
	g.soundManager = new PIXI.Container();
    g.soundManager.x = 832-128;
    g.soundManager.y = 640-64;
    g.soundManager.zOrder = -4;
    let music = new PIXI.Sprite(PIXI.loader.resources["assets/music.png"].texture)
    music.enabled = true;
    button(music,0,0,function(){
        if(music.enabled){
            music.setTexture(PIXI.loader.resources["assets/nomusic.png"].texture);
        } else{
            music.setTexture(PIXI.loader.resources["assets/music.png"].texture);
        }
        music.enabled = !music.enabled;
    });
    let sounds = new PIXI.Sprite(shapes.rectangle(64,64,"#00f"));
    button(sounds,64,0,function(){
        //Handle sfx disable
        console.log("sfx")
    });
    g.soundManager.addChild(music); 
    g.soundManager.addChild(sounds);
    g.all.addChild(g.soundManager);
    // -- START SCREEN --
    let startScreen = new menu("start",true);
    let background = new PIXI.Sprite(PIXI.loader.resources["assets/titlescreen.png"].texture)
    startScreen.addChild(background);
    let start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture)
    startScreen.addChild(start);
    button(start,64*4 + 32,64*6,function(){
        g.manager.show("level");
    })
    // -- LEVEL SELECT --
    let levelSelect = new menu("level",true);
    for(let i = 0;i < 5;i++){
        for(let j = 0;j < 2;j++){
            
            let lev = new PIXI.Sprite(PIXI.loader.resources["assets/level-1.png"].texture)
            levelSelect.addChild(lev);
            button(lev,i*128+128,j*128+128,function(){
                g.level = new g.newLevel(i+j*5);
            })
        }
    }
    // -- QUIT BUTTON --
    let exit = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    levelSelect.addChild(exit);
    button(exit,0,0,function(){
        g.manager.show("start");
    })
    // -- MENU TO SHOW ON DEATH --
    //TODO
    let deathMenu = new menu("death",false);
    let deathBase = new PIXI.Sprite(shapes.rectangle(64*6,64*4,"#000"));
    deathMenu.zOrder = -4;
    deathMenu.addChild(deathBase);

  
}
