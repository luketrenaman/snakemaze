//glpnasfasfasfsafsa
//Initialize a global value g

//Utilities
import key from "./utilities/key-press";
import "./utilities/equals";
import fps from "./utilities/fps";
import GameTick from "./utilities/gametick";
//Level
import levels from "./level/levels";
//Components
import menuConstructor from "./components/menu";
import pauseConstructor from "./components/pause";
import buildSnake from "./components/buildSnake";
//Tile rendering
import tileRender from "./tile-rendering/map";
import { TextStyleOptions } from "pixi.js";
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
}; 
key.listen(); 
window.g = {} as globalController;
g.renderer = PIXI.autoDetectRenderer(832, 640);
g.renderer.backgroundColor = 0x444444;
g.all = new PIXI.Container();
document.body.appendChild(g.renderer.view)
PIXI.loader.add("assets/sound.png").add("assets/nosound.png").add("assets/background-incomplete.png").add("assets/background-complete.png").add("assets/snake-head.png").add("assets/rainbow.json").add("assets/snake-body.png").add("assets/snake-corner.png").add("assets/snake-tail.png").add("assets/grass.png").add("assets/flowers-1.png").add("assets/flowers-2.png").add("assets/rock.png").add("assets/gem-1.png").add("assets/gem-2.png").add("assets/gem-3.png").add("assets/level-1.png").add("assets/titlescreen.png").add("assets/start.png").add("assets/back.png").add("assets/music.png").add("assets/nomusic.png").load(fonts);
function fonts() {
	WebFont.load({
		custom: {
			families: ['Pixel', 'pixelmono'],
			urls: ["/stylesheet.css"]
		},
		active: e => {
			// now start setting up your PixiJS (or canvas) stuff!
			setup()
		}
	})
}

function setup() {
	//Build guidelines
	var textures = [
		PIXI.loader.resources["assets/grass.png"].texture,
		PIXI.loader.resources["assets/flowers-1.png"].texture,
		PIXI.loader.resources["assets/flowers-2.png"].texture,
		PIXI.loader.resources["assets/rock.png"].texture
	]
	//Button is a function that creates an interactive sprite at a certain position, and provide a callback
	menuConstructor();
	g.manager.show("start"); //set to level for debug
	g.all.updateLayersOrder = function() {
		g.all.children.sort(function(a, b) {
			a.zOrder = a.zOrder || 0;
			b.zOrder = b.zOrder || 0;
			return b.zOrder - a.zOrder
		});
	};
	g.newLevel = function(num) {
		
		if (levels[num] == undefined) return; 
		//maze
		g.maze = levels[num];
		//stage
		g.stage = new PIXI.Container();
		g.stage.zOrder = -1;
		g.all.addChild(g.stage);
		g.stage.updateLayersOrder = function() {
			g.stage.children.sort(function(a, b) {
				a.zIndex = a.zIndex || 0;
				b.zIndex = b.zIndex || 0;
				return b.zIndex - a.zIndex
			});
		};

		function fixx(px){
			let x = levels[num].data[0].length * 32;
			if(px > 0 && px < -x + 832){
				calcx = false;
				return (-x + 832)/2;
			}
			if(px > 0){
				return 0;
			}
			if(px < -x + 832){
				return -x + 832;
			}
			return px;
		}
		function fixy(py){
			let y = levels[num].data.length * 32;
			if(py > 0 && py < -y + 640){
				calcy = false;
				return (-y + 640)/2;
			}
			if(py > 0){
				return 0;
			}
			if(py < -y + 640){
				return -y + 640; 
			}
			return py;
		}
		let diff;
		let then = Date.now();
		let calcx = true;
		let calcy = true;
		//give kill function
		this.kill = () => {
			loop.stop();
			gameTick.stop();
			g.level.endLoop.stop();
			g.all.removeChild(g.stage);
			g.all.removeChild(snake.counter);
			g.all.removeChild(pause.obj);
			g.manager.show("level");
		}
		this.end = function(condition) {
			//Either "victory" or "death"
			//Jam controls, explode snake
			loop.stop();
			gameTick.stop();
			//Create a new loop with no controls
			let n = 0;
			snake.counter.xvel = 0;
			g.level.endLoop = new fps(function(frames, self) {
				diff = (Date.now() - then) / 1000;
				then = Date.now();
				//make the portal continue to animate
				if (snake.exit && frames % 10 === 0) {
					snake.exitSprite.cycle++;
					snake.exitSprite.cycle %= 8;
					snake.exitSprite.setTexture(PIXI.loader.resources["assets/rainbow.json"].textures["rainbow" + snake.exitSprite.cycle + ".png"]);
				}
				if (snake.sprites.length - 1 == n) {
					snake.counter.xvel += 0.1;
					snake.counter.x += snake.counter.xvel;
				}
				if(condition === "victory"){
					if(snake.sprites.length !== n - 1){
						if (frames % 10 === 0){
							g.stage.removeChild(snake.sprites[n]);
							snake.checkMove();
							n++;
						}
					} else{
						g.manager.show("victory");
					}
				}
				if(condition === "death"){
					if (frames % 10 === 0) {
						if (snake.sprites.length - 1 === n) {
							snake.sprites[n].tint = 0x000;
							g.manager.show("death");
						} else {
							do {
								snake.sprites[n].tint = 0x000;
								n++
							} while (snake.locations[n].x === snake.locations[n + 1].x && snake.locations[n].y === snake.locations[n + 1].y)
						}
					}
				}
				if (snake.sprites.length <= n-1 || !isNaN(snake.sprites[n].worldTransform.ty) && !isNaN(snake.sprites[n].worldTransform.tx)) {
					if(calcy){
						g.stage.y += diff * 100 * (320 - snake.sprites[n].worldTransform.ty) / (40 - (+(Math.abs(320 - snake.sprites[0].worldTransform.ty) > 640)) * 39);
					}
					if(calcx){
						g.stage.x += diff * 100 * (416 - snake.sprites[n].worldTransform.tx) / (40 - (+(Math.abs(416 - snake.sprites[0].worldTransform.tx) > 832)) * 39);
					}
					g.stage.y = fixy(g.stage.y);
					g.stage.x = fixx(g.stage.x);
				}
				background.children.forEach(function(val) {
					val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64
					val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64
				})
				tiles.children.forEach(function(val) {
					val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672)
				})
				g.renderer.render(g.all);
			})
		}
		//Create a pause menu
		let pause = new pauseConstructor();
		//Hide the sound controls
		g.soundManager.visible = false;
		//Build the background, which is like the grass and such
		var bias = [80, 90, 100, 104];
		var background = new PIXI.Container();
		background.zIndex = 500;
		for (let i = -2; i < 26; i++) {
			for (let j = -2; j < 20; j++) {
				var rand = Math.random() * bias[bias.length - 1]
				var x = new PIXI.Sprite(textures[bias.indexOf(bias.filter(function(val) {
					return rand < val;
				})[0])]);
				x.scale.x = 0.5;
				x.scale.y = 0.5;
				x.x = i * 32;
				x.y = j * 32;
				x.orig = {
					"x": i / 2,
					"y": j / 2
				};
				background.addChild(x);
			}
		}
		let tiles = new PIXI.Container();
		tiles.zIndex = -1;
		g.stage.addChild(tiles);
		tileRender(g.maze.data, tiles);
		g.stage.addChild(background);
		let snake = new buildSnake();
		snake.layer();

		g.all.updateLayersOrder();
		let start = 1;
		//Start by moving the snake to allow instantaneous snake positioning
		for (let i = 0; i < 2; i++) {
			switch (levels[num].snake.direction) {
				case "r":
					snake.move(1, 0);
					break;
				case "l":
					snake.move(-1, 0);
					break;
				case "u":
					snake.move(0, 1);
					break;
				case "d":
					snake.move(0, -1);
					break;
			}
		}
		//snake.move(0,0);
		//hide menus
		g.manager.hide();
		g.stage.y = -snake.sprites[0].y + 320;
		g.stage.x = -snake.sprites[0].x + 416;
		let countdown = new PIXI.Text("3", {
			font: "52px Pixel",
			fill: "white"
		} as TextStyleOptions);
		g.stage.addChild(countdown);
		let gameTick = new GameTick(function(frames,self){
			if (frames > 24) {
				//TODO CHECK LOCATION
				snake.shoop();
				snake.checkMove();
			} else {
				if (Math.ceil(3 - frames / 8) === 0) {
					countdown.visible = false;
				} else {
					countdown.setText(Math.ceil(3 - frames / 8));
				}
			}
		},130)
		let loop = new fps(function(frames, self) {
			countdown.x = -g.stage.x + 416;
			countdown.y = -g.stage.y + 320;
			diff = (Date.now() - then) / 1000;
			then = Date.now();
			pause.handle(self, gameTick,background);
			//
			if(calcy){
				g.stage.y += diff * 100 * (320 - snake.sprites[0].worldTransform.ty) / (40 - (+(Math.abs(320 - snake.sprites[0].worldTransform.ty) > 640)) * 39);
			}
			if(calcx){
				g.stage.x += diff * 100 * (416 - snake.sprites[0].worldTransform.tx) / (40 - (+(Math.abs(416 - snake.sprites[0].worldTransform.tx) > 832)) * 39);
			}
			g.stage.y = fixy(g.stage.y);
			g.stage.x = fixx(g.stage.x);
            background.children.forEach(function(val) {
				val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64
				val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64
			})
			tiles.children.forEach(function(val) {
				val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672)
			})
			g.renderer.render(g.all);
		})
		return this;
	}
}