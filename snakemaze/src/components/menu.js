import key from "../utilities/key-press";
export let theme = new Howl({
	src:['assets/snak.mp3','assets/snak.ogg'],
	loop:true,
	volume:1
});

class MenuManager{
    constructor(){
        this.menus = [];
        this.current = "";
    }
    
    show(menuName){
        this.hide();
        if(menuName === "pause"){
            g.soundManager.visible = true;
            g.renderer.render(g.all);
            return;
        }
        if(menuName !== "tutorial"){
            this.current = menuName;
        }
        this.menus.forEach(function(val) {
            if(val.name === menuName){
                if(menuName === "tutorial"){
                    g.all.removeChild(val);
                    g.all.addChild(val);
                }
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
                    g.base.isNextAllowed();
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
import { getGeneratedNameForNode, textSpanIsEmpty } from "typescript";
class SoundManager extends PIXI.Container{
    constructor(){
        super();
        this.x = 832-192-16;
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
            if(this.name === "tutorial"){
                g.manager.show("tutorial");
                return;
            }
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
            if(this.enabled){
                theme.pause();
                theme.play();
            } else{
                theme.pause();
            }
        }
        localStorage.setItem("snakemaze_save",JSON.stringify(g.save));
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
        if((num === 4 && !g.save.levelCompletion.every(function(lv){
            return lv > 2;
        }))){
            return;
        }
        let trophy;
        this.children.forEach(function(val){
            if(val.config && val.config.value === num){
                trophy = val;
            }
            if(val.config){
                val.alpha = 0.6;
            }
        })
        trophy.alpha = 1;
        this.txt.alpha = 1;
        g.difficulty = trophy.config;
        this.updateDifficulty();
        g.renderer.render(g.all);
        //save selected difficulty
        g.save.selectedDifficulty = num;
        localStorage.setItem("snakemaze_save",JSON.stringify(g.save));
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

export let menuConstructor = function(){

    g.manager = new MenuManager();
    // -- TUTORIAL SCREEN --
    let tutorialScreen = new Menu("tutorial",false);
    let tutorial = new PIXI.Sprite(PIXI.loader.resources["assets/tutorial.png"].texture);
    tutorialScreen.addChild(tutorial);
    // -- QUIT TO LEVEL SELECT FROM TUTORIAL SCREEN --
    let exitTutorial = new PIXI.Sprite(PIXI.loader.resources["assets/x.png"].texture);
    tutorialScreen.addChild(exitTutorial);
    button(
        exitTutorial, 768-32, 24, function () {
            g.manager.show(g.manager.current);
        }
        )
    // -- START SCREEN --
    let startScreen = new Menu("start",true);
    let background = new PIXI.Sprite(PIXI.loader.resources["assets/level-select.png"].texture) //832, 640
    startScreen.addChild(background);
    let titleText = new PIXI.Sprite(PIXI.loader.resources["assets/title-text.png"].texture)
    titleText.x = 832 / 2 - 512 / 2;
    titleText.y = 64 * 3 - 256 / 2;
    startScreen.addChild(titleText);
    let start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture)
    startScreen.addChild(start);
    button(start, 64 * 4 + 32, 64 * 6, function () {
        if(g.save.firstPlaythrough){
            g.manager.show("tutorial");
            g.save.firstPlaythrough = false;
            g.manager.current = "level";
        } else{
            g.manager.show("level");
        }
            localStorage.setItem("snakemaze_save",JSON.stringify(g.save));
            if(g.save.musicEnabled){
                theme.pause();
                theme.play();


            }
        })
    // -- LEVEL SELECT --
    let levelSelect = new Menu("level",true);
    let levelBackground = new PIXI.Sprite(PIXI.loader.resources["assets/level-select.png"].texture);
    levelSelect.addChild(levelBackground);
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
        "trials":2,
        "tickrate":175,
        "name":"casual",
        "color":"#e59734",
        "value":1
    });
    let silver = new TrophySelect(PIXI.loader.resources["assets/trophy-silver.png"].texture,(68+32),{
        "long":25,
        "medium":15,
        "short":8,
        "trials":3,
        "tickrate":150,
        "name":"normal",
        "color":"#b8b8b8",
        "value":2
    });
    let gold = new TrophySelect(PIXI.loader.resources["assets/trophy-gold.png"].texture,(68+32)*2,{
        "long":30,
        "medium":20,
        "short":10,
        "trials":4,
        "tickrate":125,
        "name":"hard",
        "color":"#f6d91f",
        "value":3
    });
    let diamond = new TrophySelect(PIXI.loader.resources["assets/trophy-diamond.png"].texture,(68+32)*3,{
        "long":40,
        "medium":25,
        "short":12,
        "trials":5,
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
    let lock = new PIXI.Sprite(PIXI.loader.resources["assets/trophy-diamond-locked.png"].texture);
    trophyManager.add(lock);
    lock.x = (68+32)*3 + 12;
    lock.y = 12;
    levelSelect.addChild(trophyManager);
    // -- HANDLE MUSIC --
    g.soundManager = new SoundManager();
    g.soundManager.addChild(new SoundMenu(-4,0,
        PIXI.loader.resources["assets/tut.png"].texture,
        PIXI.loader.resources["assets/tut.png"].texture,"tutorial")
    )
    g.soundManager.addChild(new SoundMenu(64,0,
        PIXI.loader.resources["assets/music.png"].texture,
        PIXI.loader.resources["assets/nomusic.png"].texture,"music")
    )
    g.soundManager.addChild(new SoundMenu(132,0,
        PIXI.loader.resources["assets/sound.png"].texture,
        PIXI.loader.resources["assets/nosound.png"].texture,"sound")
    );
    g.all.addChild(g.soundManager);
    // -- QUIT TO TITLE SCREEN BUTTON --
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
    g.base.isNextAllowed = function(){
        let comp = 1;
        g.save.levelCompletion.forEach(function(val){
            comp += val > 0;
        });
        let unlocked = comp >= g.manager.num + 1;
        if(unlocked){
            next.alpha = 1;
            next.interactive = true;
        } else{
            next.alpha = 0;
            next.interactive = false;
        }
    }
    let allowReplay = true;
    function testReplay(){
        if(allowReplay && g.stage){
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
        if(g.stage){
            g.level.kill();
            g.manager.show("level");
        }
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
            //if x levels are completed, x + 2 level will be unlocked
            let comp = 1;
            levelCompletion.forEach(function(val){
                comp += val > 0;
            });

            if(comp >= i){
                levelSelect.levels[i].interactive = true;
                levelSelect.levels[i].alpha = 1;
                levelSelect.levels[i].showTrophies(levelCompletion[i]);
            } else{
                levelSelect.levels[i].interactive = false;
                levelSelect.levels[i].alpha = 0.6;
            }
        }
        if(g.save.levelCompletion.every(function(lv){
            return lv > 2;
        })){
            lock.visible = false;
            diamond.interactive = true;
        } else{
            lock.visible = true;
            diamond.interactive = false;
        }
    }
    //Relevant to save data
}
