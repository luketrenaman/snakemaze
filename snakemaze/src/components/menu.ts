class MenuManager{
    menus: Array<Menu>;
    constructor(){
        this.menus = [];
    }
    show(menuName:string){
        this.hide();
        this.menus.forEach(function(val) {
            if(val.name === menuName){
                val.visible = true;
                g.soundManager.visible = val.sound;
                if(val.name === "victory" || val.name === "death"){
                    if(val.name === "death"){
                        g.base.txt.setText("Level failed!");
                        g.base.txt.setStyle({
                            font: "35px Pixel",
                            fill: "#e74c3c"
                        } as TextStyleOptions);
                    }
                    if(val.name === "victory"){
                        g.base.txt.setText("Level complete!");
                        g.base.txt.setStyle(
                            {
                                font: "35px Pixel",
                                fill: "#2ecc71"
                            } as TextStyleOptions)
                    }
                    g.base.addChild(g.base.txt);
                    val.addChild(g.base);
                    
                }

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
                    g.renderer.render(g.all);
                }
                else {
                    this.setTexture(textureOff);
                    g.renderer.render(g.all);
                }
                this.enabled = !this.enabled;
            }
            );
    }
}
interface DifficultyConfig{
    long:number,
    medium:number,
    short:number,
    tickrate:number,
    name:string,
    color:string
}
class TrophyManager extends PIXI.Container{
    trophies:Array<TrophySelect>;
    txt:PIXI.Text;
    constructor(){
        super();
        this.x = 32;
        this.y = 640 - 68 - 32;
        this.trophies = [];
        this.txt = new PIXI.Text("");
        this.txt.y = -64;
        this.addChild(this.txt);
    }
    select(trophy){
        this.children.forEach(function(val){
            val.alpha = 0.6;
        })
        trophy.alpha = 1;
        this.txt.alpha = 1;
        g.difficulty = trophy.config;
        this.updateDifficulty();
        g.renderer.render(g.all);
    }
    add(trophy:TrophySelect){
        this.addChild(trophy);
    }
    updateDifficulty(){
        this.txt.setText(g.difficulty.name);
        this.txt.setStyle(
            {
                font: "35px Pixel",
                fill: g.difficulty.color
            } as TextStyleOptions)
    }
}
class TrophySelect extends PIXI.Sprite{
    config:DifficultyConfig;
    constructor(tex,x:number,config:DifficultyConfig){
        super(tex);
        this.x = x;
        this.config = config;
        button(this,this.x,this.y,() =>{
            (this.parent as TrophyManager).select(this);
        })
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
    let bronze = new TrophySelect(PIXI.loader.resources["assets/trophy-bronze.png"].texture,0,{
        "long":20,
        "medium":10,
        "short":5,
        "tickrate":250,
        "name":"casual",
        "color":"#d6841c"
    });
    let silver = new TrophySelect(PIXI.loader.resources["assets/trophy-silver.png"].texture,(68+32),{
        "long":25,
        "medium":15,
        "short":8,
        "tickrate":200,
        "name":"normal",
        "color":"#95928f"
    });
    let gold = new TrophySelect(PIXI.loader.resources["assets/trophy-gold.png"].texture,(68+32)*2,{
        "long":40,
        "medium":20,
        "short":10,
        "tickrate":130,
        "name":"hard",
        "color":"#f6d91f"
    });
    let diamond = new TrophySelect(PIXI.loader.resources["assets/trophy-diamond.png"].texture,(68+32)*3,{
        "long":50,
        "medium":25,
        "short":12,
        "tickrate":100,
        "name":"insane",
        "color":"#2ac4b3"
    });
    g.difficulty = bronze.config;
    let trophyManager = new TrophyManager();
    trophyManager.add(bronze);
    trophyManager.add(silver);
    trophyManager.add(gold);
    trophyManager.add(diamond);
    trophyManager.select(bronze);
    levelSelect.addChild(trophyManager);
    // -- QUIT BUTTON --
    let exit = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    levelSelect.addChild(exit);
    button(
        exit, 32, 32, function () {
            g.manager.show("start");
        }
        )
    // -- MENU TO SHOW ON DEATH --
    //TODO
    g.base = new PIXI.Sprite(shapes.rectangle(64*6,64*4,"rgba(0, 0, 0,0.7)"));
    g.base.x = 832 /2 - g.base.width / 2;
    g.base.y = 640 / 2 - g.base.height / 2;

    g.base.txt = new PIXI.Text();
    g.base.txt.anchor.x = 0.5;
    g.base.txt.x = g.base.width / 2
    g.base.txt.y = 32;
    let exit2 = new PIXI.Sprite(PIXI.loader.resources["assets/menu.png"].texture);
    button(
        exit2, 0, 0, function () {
            g.level.kill();
            g.manager.show("level");
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
    button(
        next,next.x,next.y,function(){
        }
    )
    exit2.x = 32;
    replay.x = 64*2+32;
    next.x = 64*5;
    exit2.y = 64*3 - 32;
    replay.y = 64*3 - 32;
    next.y = 64*3 - 32;
    g.base.addChild(exit2);
    g.base.addChild(replay);
    g.base.addChild(next);
    
let allowReplay = true;
    replay.on('click',function(){
        if(allowReplay){
            allowReplay = false;
            g.level.kill();
            setTimeout(function(){
                g.level = g.newLevel(g.manager.num);
                allowReplay = true;
            },50);
        }
    });
    next.on('click',function(){
        if(allowReplay){
            allowReplay = false;
            g.level.kill();
            if (g.manager.num != 9){
                setTimeout(function(){
                    g.level = g.newLevel(g.manager.num + 1);
                    allowReplay = true;
                },50);
            } else{
                g.manager.show("level");
            }
        }
    })
        //Set callback of below hamburgers
    let deathMenu = new Menu("death",false);
    deathMenu.zOrder = -4;
    let victoryMenu = new Menu("victory",false);
    victoryMenu.zOrder = -4;
    //base.addChild(exit2);
    //base.addChild(replay);
   // base.addChild(next);
    //victoryMenu.addChild(exit2);
  
}
