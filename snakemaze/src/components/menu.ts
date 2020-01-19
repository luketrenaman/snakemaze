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
        console.log("render")
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
        this.x = 832-128-16;
        this.y = 640-64-16;
        this.zOrder = -4;
    }
}
class SoundMenu extends PIXI.Sprite{
    enabled: Boolean;
    constructor(x:number,y:number,textureOn:PIXI.Texture,textureOff:PIXI.Texture){
        super(textureOn);
        this.enabled = true;
        button(this, x, y, () => {
                if (!this.enabled) {
                    this.setTexture(textureOn);
                }
                else {
                    this.setTexture(textureOff);
                }
                this.enabled = !this.enabled;
            }
            );
    }
}
export default function(){
    g.manager = new MenuManager();
    // -- HANDLE MUSIC --
    g.soundManager = new SoundManager();
    g.soundManager.addChild(new SoundMenu(-4,0,
        PIXI.loader.resources["assets/music.png"].texture,
        PIXI.loader.resources["assets/nomusic.png"].texture)
    )
    g.soundManager.addChild(new SoundMenu(64,0,
        PIXI.loader.resources["assets/sound.png"].texture,
        PIXI.loader.resources["assets/nosound.png"].texture)
    );
    g.all.addChild(g.soundManager);
    // -- START SCREEN --
    let startScreen = new Menu("start",true);
    let background = new PIXI.Sprite(PIXI.loader.resources["assets/titlescreen.png"].texture)
    startScreen.addChild(background);
    let start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture)
    startScreen.addChild(start);
    button(start, 64 * 4 + 32, 64 * 6, function () {
            g.manager.show("level");
        })
    // -- LEVEL SELECT --
    let levelSelect = new Menu("level",true);
    for(let i = 0;i < 5;i++){
        for(let j = 0;j < 2;j++){
            
            let lev = new PIXI.Sprite(PIXI.loader.resources["assets/background-incomplete.png"].texture)
            levelSelect.addChild(lev);
            button(
                lev, i * 128 + 128, j * 128 + 128, function () {
                    g.level = new g.newLevel(i + j * 5);
                }
            )
            var text = new PIXI.Text(i + j*5, {
                font: "48px Pixel",
                fill: "white"
            } as TextStyleOptions);
            text.anchor.x = 0.5;
            text.x = 32;
            text.y = 8;
            lev.addChild(text);
        }
    }
    // -- QUIT BUTTON --
    let exit = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    levelSelect.addChild(exit);
    button(
        exit, 0, 0, function () {
            g.manager.show("start");
        }
        )
    // -- MENU TO SHOW ON DEATH --
    //TODO
    let exit2 = new PIXI.Sprite(PIXI.loader.resources["assets/menu.png"].texture);
    button(
        exit2, 0, 0, function () {
            g.manager.show("start");
            g.level.kill();
        }
    )
    let replay = new PIXI.Sprite(PIXI.loader.resources["assets/refresh.png"].texture);
    let next = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    next.scale.x = -1;
    next.anchor.x = 0.5;

    button(
        replay,replay.x,replay.y,function(){
        }
    )
    let allowReplay = true;
    g.manager.loadReplay = function(num){
        replay.on('click',function(){
            if(allowReplay){
                allowReplay = false;
                g.level.kill();
                setTimeout(function(){
                    g.level = new g.newLevel(num);
                    allowReplay = true;
                },50)
            }
        })
        //Set callback of below hamburgers
    }
    let deathMenu = new Menu("death",false);
    let deathBase = new PIXI.Sprite(shapes.rectangle(64*6,64*4,"rgba(0, 0, 0,0.7)"));
    deathBase.x = 832 /2 - deathBase.width / 2
    deathBase.y = 640 / 2 - deathBase.height / 2
    deathMenu.zOrder = -4;
    let youDied = new PIXI.Text("Level failed!", {
        font: "40px Pixel",
        fill: "#e74c3c"
    } as TextStyleOptions);
    youDied.anchor.x = 0.5;
    youDied.x = deathBase.width / 2
    youDied.y = 32;
    
    exit2.x = 32;
    replay.x = 64*2+32;
    next.x = 64*5;
    exit2.y = 64*3 - 32;
    replay.y = 64*3 - 32;
    next.y = 64*3 - 32;


    deathBase.addChild(youDied);
    deathBase.addChild(exit2);
    deathBase.addChild(replay);
    deathBase.addChild(next);
    deathMenu.addChild(deathBase);
    let victoryMenu = new Menu("victory",false);
    let victoryBase = new PIXI.Sprite(shapes.rectangle(64*6,64*4,"rgba(0, 0, 0,0.7)"));
    victoryBase.x = 832 /2 - victoryBase.width / 2
    victoryBase.y = 640 / 2 - victoryBase.height / 2
    victoryMenu.zOrder = -4;
    let youWon = new PIXI.Text("Level complete!", {
        font: "40px Pixel",
        fill: "#2ecc71"
    } as TextStyleOptions);
    youWon.anchor.x = 0.5;
    youWon.x = youWon.width / 2
    youWon.y = 32;
    victoryBase.addChild(youWon);
    //victoryBase.addChild(exit2);
    //victoryBase.addChild(replay);
   // victoryBase.addChild(next);
    victoryMenu.addChild(victoryBase);
    //victoryMenu.addChild(exit2);
  
}
