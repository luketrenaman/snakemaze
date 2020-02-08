import key from "../utilities/key-press";
class MenuManager{
    constructor(){
        this.menus = [];
    }
    
    show(menuName){
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
                        });
                    }
                    if(val.name === "victory"){
                        g.base.txt.setText("Level complete!");
                        g.base.txt.setStyle(
                            {
                                font: "35px Pixel",
                                fill: "#2ecc71"
                            })
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
    push(menu){
        this.menus.push(menu);
    }
}
class Menu extends PIXI.Container{
    constructor(name,sound){
        super()
        this.name = name;
        this.sound = sound;
        g.manager.push(this);
        g.all.addChild(this);
    }
}
import shapes from "../drawing/shapes";
import button from "./button";
import keyPress from "../utilities/key-press";
class SoundManager extends PIXI.Container{
    constructor(){
        super();
        this.x = 832-128-16;
        this.y = 640-64-16;
        this.zOrder = -4;
    }
}
class SoundMenu extends PIXI.Sprite{
    constructor(x,y,textureOn,textureOff,name){
        super(textureOn);
        this.name = name;
        this.enabled = true;
        this.textureOn = textureOn;
        this.textureOff = textureOff;
        button(this, x, y, () => {
                if (!this.enabled) {
                    this.enable();
                }
                else {
                    this.disable();
                }
                this.save();
            }
            );
    }
    enable(){
        this.setTexture(this.textureOn);
        g.renderer.render(g.all);
        this.enabled = true;
    }
    disable(){
        this.setTexture(this.textureOff);
        g.renderer.render(g.all);
        this.enabled = false;
    }
    save(){
        if(this.name === "sound"){
            g.save.soundsEnabled = this.enabled;
        }
        if(this.name === "music"){
            g.save.musicEnabled = this.enabled;
        }
        localStorage.setItem("snakemaze_save_data",JSON.stringify(g.save));
    }
}
class TrophyManager extends PIXI.Container{
    constructor(){
        super();
        this.x = 32;
        this.y = 640 - 68 - 32;
        this.trophies = [];
        this.txt = new PIXI.Text("");
        this.txt.y = -64;
        this.addChild(this.txt);
    }
    select(num){
        let trophy;
        this.children.forEach(function(val){
            if(val.config && val.config.value === num){
                trophy = val;
            }
            val.alpha = 0.6;
        })
        trophy.alpha = 1;
        this.txt.alpha = 1;
        g.difficulty = trophy.config;
        this.updateDifficulty();
        g.renderer.render(g.all);
        //save selected difficulty
        g.save.selectedDifficulty = num;
        localStorage.setItem("snakemaze_save_data",JSON.stringify(g.save));
    }
    add(trophy){
        this.addChild(trophy);
    }
    updateDifficulty(){
        this.txt.setText(g.difficulty.name);
        this.txt.setStyle(
            {
                font: "35px Pixel",
                fill: g.difficulty.color
            })
    }
}
class TrophySelect extends PIXI.Sprite{
    constructor(tex,x,config){
        super(tex);
        this.x = x;
        this.config = config;
        button(this,this.x,this.y,() =>{
            (this.parent).select(this.config.value);
        })
    }
}
class TrophyIcon extends PIXI.Sprite{
    constructor(metal,value){
        super(PIXI.loader.resources["assets/award-" + metal + ".png"].texture);
        this.scale.x = 0.75;
        this.scale.y = 0.75;
        this.value = value;
        this.visible = false;
    }
}
class LevelSelect extends PIXI.Sprite{
    constructor(i,j){
        super(PIXI.loader.resources["assets/background-incomplete.png"].texture);
        button(
            this, i * 128 + 128, j * 128 + 128, function () {
                g.level = new g.newLevel(i + j * 5);
            }
        )
        this.addChild(new TrophyIcon("bronze",1));
        this.addChild(new TrophyIcon("silver",2));
        this.addChild(new TrophyIcon("gold",3));
        this.addChild(new TrophyIcon("diamond",4));
        for(let i = 0;i < this.children.length;i++){
            this.children[i].y = 56;
            this.children[i].x = i * 12;
        }
        var text = new PIXI.Text(i + j*5 + 1, {
            font: "48px Pixel",
            fill: "white"
        });
        text.anchor.x = 0.5;
        text.x = 32;
        text.y = 8;
        text.value = 0;
        this.addChild(text);

    }
    showTrophies(completion){
        this.children.forEach(function(icon){
            if(icon.value <= completion){
                icon.visible = true;
            };
        });
        if(completion > 0){
            this.texture = PIXI.loader.resources["assets/background-complete.png"].texture;
        }
        g.renderer.render(g.all);
    }
}

export default function(){
    g.manager = new MenuManager();
    // -- HANDLE MUSIC --
    g.soundManager = new SoundManager();
    g.soundManager.addChild(new SoundMenu(-4,0,
        PIXI.loader.resources["assets/music.png"].texture,
        PIXI.loader.resources["assets/nomusic.png"].texture,"music")
    )
    g.soundManager.addChild(new SoundMenu(64,0,
        PIXI.loader.resources["assets/sound.png"].texture,
        PIXI.loader.resources["assets/nosound.png"].texture,"sound")
    );
    g.all.addChild(g.soundManager);
    // -- START SCREEN --
    let startScreen = new Menu("start",false);
    let background = new PIXI.Sprite(PIXI.loader.resources["assets/titlescreen.png"].texture)
    startScreen.addChild(background);
    let start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture)
    startScreen.addChild(start);
    button(start, 64 * 4 + 32, 64 * 6, function () {
            g.manager.show("level");
        })
    // -- LEVEL SELECT --
    let levelSelect = new Menu("level",true);
    levelSelect.levels = [];
    for(let i = 0;i < 5;i++){
        for(let j = 0;j < 2;j++){
            
            let lev = new LevelSelect(i,j);
            levelSelect.levels[i + j * 5] = lev;
            levelSelect.addChild(lev);
        }
    }
    let bronze = new TrophySelect(PIXI.loader.resources["assets/trophy-bronze.png"].texture,0,{
        "long":20,
        "medium":10,
        "short":5,
        "tickrate":200,
        "name":"casual",
        "color":"#e59734",
        "value":1
    });
    let silver = new TrophySelect(PIXI.loader.resources["assets/trophy-silver.png"].texture,(68+32),{
        "long":25,
        "medium":15,
        "short":8,
        "tickrate":160,
        "name":"normal",
        "color":"#b8b8b8",
        "value":2
    });
    let gold = new TrophySelect(PIXI.loader.resources["assets/trophy-gold.png"].texture,(68+32)*2,{
        "long":40,
        "medium":20,
        "short":10,
        "tickrate":130,
        "name":"hard",
        "color":"#f6d91f",
        "value":3
    });
    let diamond = new TrophySelect(PIXI.loader.resources["assets/trophy-diamond.png"].texture,(68+32)*3,{
        "long":50,
        "medium":25,
        "short":12,
        "tickrate":100,
        "name":"insane",
        "color":"#2ac4b3",
        "value":4
    });
    g.difficulty = bronze.config;
    let trophyManager = new TrophyManager();
    trophyManager.add(bronze);
    trophyManager.add(silver);
    trophyManager.add(gold);
    trophyManager.add(diamond);
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
    function testReplay(){
        if(allowReplay){
            allowReplay = false;
            g.level.kill();
            setTimeout(function(){
                g.level = g.newLevel(g.manager.num);
                allowReplay = true;
            },50);
        }
    }
    replay.on('click',testReplay);
    //r pressed, restart level
    key.waitDown(82,testReplay,true);
    //Esc pressed, exit game
    key.waitDown(27,function(){
        g.level.kill();
        g.manager.show("level");
    },true);

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
    g.manager.selectDifficulty = function(difficulty){
        trophyManager.select(difficulty);
    }
    g.manager.levelCompletion = function(levelCompletion){
        for(let i = 0; i < levelSelect.levels.length;i++){
            (levelSelect.levels[i]).showTrophies(levelCompletion[i]);
        }
    }
    //Relevant to save data
}
