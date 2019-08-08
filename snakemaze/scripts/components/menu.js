import shapes from "./../drawing/shapes.js";
import button from "./button.js";
export default function(){
	if(window.g == undefined) window.g = {};
	g = window.g;
	g.soundManager = new PIXI.Container();
    g.soundManager.x = 832-128;
    g.soundManager.y = 640-64;
    g.soundManager.zOrder = -4;
    let music = new PIXI.Sprite(PIXI.loader.resources["assets/music.png"].texture)
    button(music,0,0,function(){
        music.setTexture(PIXI.loader.resources["assets/nomusic.png"].texture);
        //Handle music disable
        console.log("music")
    });
    let sounds = new PIXI.Sprite(shapes.rectangle(64,64,"#00f"));
    button(sounds,64,0,function(){
        //Handle sfx disable
        console.log("sfx")
    });
    g.soundManager.addChild(music); 
    g.soundManager.addChild(sounds);
    g.all.addChild(g.soundManager);
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
	g.manager = new menuManager();
	//construct menus my brotha
	class menu extends PIXI.Container{
		constructor(name,sound){
			super()
			this.name = name;
			this.sound = sound;
			g.manager.push(this);
			g.all.addChild(this);
		}
	}
    //startScreen
    let startScreen = new menu("start",true);
    let background = new PIXI.Sprite(PIXI.loader.resources["assets/titlescreen.png"].texture)
    startScreen.addChild(background);
    let start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture)
    startScreen.addChild(start);
    button(start,64*4 + 32,64*6,function(){
        g.manager.show("level");
    })
    //level select
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
    let exit = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    levelSelect.addChild(exit);
    button(exit,0,0,function(){
        g.manager.show("start");
    })
    let deathMenu = new menu("death",false);
    let deathBase = new PIXI.Sprite(shapes.rectangle(64*6,64*4,"#000"));
    deathMenu.addChild(deathBase);

  
}
