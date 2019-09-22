class MenuManager{
    menus: Array<Menu>;
    constructor(){
        this.menus = []
    }
    show(menuName:string){
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
    push(menu:Menu){
        this.menus.push(menu);
    }
}
class Menu extends PIXI.Container{
    zOrder:number;
    name: string;
    sound:boolean;
    constructor(name:string,sound:boolean){
        super()
        this.name = name;
        this.sound = sound;
        g.manager.push(this);
        g.all.addChild(this);
    }
}
import shapes from "../drawing/shapes";
import button from "./button";
class SoundManager extends PIXI.Container{
    zOrder:number;
    constructor(){
        super();
        this.x = 832-128;
        this.y = 640-64;
        this.zOrder = -4;
    }
}
class SoundMenu extends PIXI.Sprite{
    enabled: Boolean;
    constructor(x:number,y:number,textureOn:PIXI.Texture,textureOff:PIXI.Texture){
        super(textureOn);
        this.enabled = true;
        button(this,0,0,function(){
            if(this.enabled){
                this.setTexture(textureOn);
            } else{
                this.setTexture(textureOff);
            }
            this.enabled = !this.enabled;
        });
    }
}
export default function(){
    console.log("FABRICATI ONSs");
    g.manager = new MenuManager();
    // -- HANDLE MUSIC --
    g.soundManager = new SoundManager();
    g.soundManager.addChild(new SoundMenu(0,0,
        PIXI.loader.resources["assets/music.png"].texture,
        PIXI.loader.resources["assets/nomusic.png"].texture)
    )
    g.soundManager.addChild(new SoundMenu(64,0,
        shapes.rectangle(64,64,"#00f"),
        shapes.rectangle(64,64,"#0ff"))
    )
    g.all.addChild(g.soundManager);
    // -- START SCREEN --
    let startScreen = new Menu("start",true);
    let background = new PIXI.Sprite(PIXI.loader.resources["assets/titlescreen.png"].texture)
    startScreen.addChild(background);
    let start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture)
    startScreen.addChild(start);
    button(start,64*4 + 32,64*6,function(){
        g.manager.show("level");
    })
    // -- LEVEL SELECT --
    let levelSelect = new Menu("level",true);
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
    let exit2 = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    button(exit2,0,0,function(){
        g.manager.show("start");
        g.level.kill();
    })
    let deathMenu = new Menu("death",false);
    let deathBase = new PIXI.Sprite(shapes.rectangle(64*6,64*4,"#000"));
    deathBase.x = 832 /2 - deathBase.width / 2
    deathBase.y = 640 / 2 - deathBase.height / 2
    deathMenu.zOrder = -4;
    deathMenu.addChild(deathBase);
    deathMenu.addChild(exit2);
    let victoryMenu = new Menu("victory",false);
    let victoryBase = new PIXI.Sprite(shapes.rectangle(64*6,64*4,"#fff"));
    victoryBase.x = 832 /2 - victoryBase.width / 2
    victoryBase.y = 640 / 2 - victoryBase.height / 2
    victoryMenu.zOrder = -4;
    victoryMenu.addChild(victoryBase);
    victoryMenu.addChild(exit2);

  
}
