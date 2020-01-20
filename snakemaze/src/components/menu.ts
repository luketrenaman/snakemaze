class MenuManager{
    menus: Array<Menu>;
    constructor(){
        this.menus = []
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
                console.log(g.manager.num);
                allowReplay = true;
            },50)
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
