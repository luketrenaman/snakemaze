//glpnasfasfasfsafsa
//Initialize a global value g

//Utilities
import key from "./utilities/key-press";
import "./utilities/equals";
import fps from "./utilities/fps";
//Level
import levels from "./level/levels";
//Components
import menuConstructor from "./components/menu";
import pauseConstructor from "./components/pause";
import buildSnake from "./components/buildSnake";
//Tile rendering
import tileRender from "./tile-rendering/map";
import { TextStyleOptions } from "pixi.js";
console.log("initialize")
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
}; 
key.listen(); 
(<any>window).g = {} as globalController
g.renderer = PIXI.autoDetectRenderer(832, 640);
g.renderer.backgroundColor = 0x444444;
let all = new PIXI.Container();
export { all };
document.body.appendChild(g.renderer.view)
PIXI.loader.add("assets/snake-head.png").add("assets/rainbow.json").add("assets/snake-body.png").add("assets/snake-corner.png").add("assets/snake-tail.png").add("assets/grass.png").add("assets/flowers-1.png").add("assets/flowers-2.png").add("assets/rock.png").add("assets/gem-1.png").add("assets/gem-2.png").add("assets/gem-3.png").add("assets/level-1.png").add("assets/titlescreen.png").add("assets/start.png").add("assets/back.png").add("assets/music.png").add("assets/nomusic.png").load(fonts);
console.log("breaaak");
function fonts() {
	WebFont.load({
		custom: {
			families: ['Pixel', 'pixelmono'],
			urls: ["/stylesheet.css"]
		},
		active: e => {
			console.log("font loaded!");
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
	console.log(g.manager)
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
		//give kill function
		this.kill = () => {
			loop.stop()
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
			//Create a new loop with no controls
			let n = 0;
			snake.counter.xvel = 0;
			g.level.endLoop = new fps(function(frames, self) {
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
				if (frames % 10 === 0) {
					if (snake.sprites.length - 1 == n) {
						snake.sprites[n].tint = 0x000;
						g.manager.show("death");
					} else {
						do {
							snake.sprites[n].tint = 0x000;
							n++
						} while (snake.locations[n].x === snake.locations[n + 1].x && snake.locations[n].y === snake.locations[n + 1].y)
					}
				}
				if (!isNaN(snake.sprites[n].worldTransform.ty) && !isNaN(snake.sprites[n].worldTransform.tx)) {
					g.stage.y += (320 - snake.sprites[n].worldTransform.ty) / 40;
					g.stage.x += (416 - snake.sprites[n].worldTransform.tx) / 40;
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
				})[0])])
				x.scale.x = 0.5;
				x.scale.y = 0.5;
				x.x = i * 32;
				x.y = j * 32;
				x.orig = {
					"x": i / 2,
					"y": j / 2
				}
				background.addChild(x)
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
					snake.move(1, 0)
					break;
				case "l":
					snake.move(-1, 0)
					break;
				case "u":
					snake.move(0, 1)
					break;
				case "d":
					snake.move(0, -1)
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
		g.all.addChild(countdown);
		countdown.y = 320;
		countdown.x = 416;
		let loop = new fps(function(frames, self) {
			g.stage.y += (320 - snake.sprites[0].worldTransform.ty) / (40 - (+(Math.abs(320 - snake.sprites[0].worldTransform.ty) > 640)) * 39);
			g.stage.x += (416 - snake.sprites[0].worldTransform.tx) / (40 - (+(Math.abs(416 - snake.sprites[0].worldTransform.tx) > 832)) * 39);
            background.children.forEach(function(val) {
				val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64
				val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64
			})
			tiles.children.forEach(function(val) {
				val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672)
			})
			if (frames % 8 == 0 && frames > 180) {
				pause.handle(self, background);
				//TODO CHECK LOCATION
				snake.direction = snake.predirection;
				console.log(snake.direction)
				switch (snake.direction) {
					case "l":
						snake.move(-1, 0);
						break;
					case "r":
						snake.move(1, 0);
						break;
					case 'u':
						snake.move(0, 1);
						break;
					case 'd':
						snake.move(0, -1);
				}
			} else {
				if (Math.ceil(3 - frames / 60) === 0) {
					countdown.visible = false;
				} else {
					countdown.setText(Math.ceil(3 - frames / 60));
				}
			}
			g.renderer.render(g.all);
		})
		return this;
	}
}