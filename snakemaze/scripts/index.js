
//Initialize a global value "g"
window.g = {};
//Utilities
import key from "./utilities/key-press.js";
import "./utilities/equals.js";
import fps from "./utilities/fps.js";
//Drawing
import shapes from "./drawing/shapes.js";
//Level
import levels from "./level/levels.js";
//Components
import menuConstructor from "./components/menu.js";
import pauseConstructor from "./components/pause.js";
import buildSnake from "./components/buildSnake.js";
//Tile renderin
import tileRender from "./tile-rendering/map.js";
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
};
key.listen();
g.renderer = PIXI.autoDetectRenderer(832, 640);
g.renderer.backgroundColor = 0x444444;
g.all = new PIXI.Container();
document.body.appendChild(g.renderer.view)
PIXI.loader.add("assets/snake-head.png")
	.add("assets/rainbow.json")
	.add("assets/snake-body.png")
	.add("assets/snake-corner.png")
	.add("assets/snake-tail.png")
	.add("assets/grass.png")
	.add("assets/flowers-1.png")
	.add("assets/flowers-2.png")
	.add("assets/rock.png")
	.add("assets/gem-1.png")
	.add("assets/gem-2.png")
    .add("assets/gem-3.png")
	.add("assets/level-1.png")
	.add("assets/titlescreen.png")
	.add("assets/start.png")
	.load(fonts);1

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
	g.manager.show("level");
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
		//hide menus
		g.manager.hide();
		//give kill function
		this.kill = () => {
			loop.stop()
			g.all.removeChild(g.stage);
			g.all.removeChild(snake.counter);
			g.all.removeChild(pause.obj);
			g.manager.show("level");
		}
		this.death = function() {
			//Jam controls, explode snake
			loop.stop();
			//Create a new loop with no controls
			let n = 0;
			snake.counter.xvel = 0;
			let death = new fps(function(frames, self) {
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
						snake.sprites[n].tint = "0x000";
						g.manager.show("death");
					} else {
						do {
							snake.sprites[n].tint = "0x000";
							n++
						} while (snake.locations[n].x === snake.locations[n + 1].x && snake.locations[n].y === snake.locations[n + 1].y)
					}
				}
				if (!isNaN(snake.sprites[n].worldTransform.ty) && !isNaN(snake.sprites[n].worldTransform.tx)) {
					g.stage.y += (320 - snake.sprites[n].worldTransform.ty) / 40;
					g.stage.x += (416 - snake.sprites[n].worldTransform.tx) / 40;
				}
				background.children.forEach(function(val) {
					val.y = (val.orig.y * 64 + g.stage.y)
						.mod(640 + 64) - g.stage.y - 64
					val.x = (val.orig.x * 64 + g.stage.x)
						.mod(832 + 64) - g.stage.x - 64
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
		let snake = new buildSnake()
		snake.layer();
		let direction = snake.direction;
		let predirection = snake.direction;
		g.all.updateLayersOrder();
		let start = 1;
		let loop = new fps(function(frames, self) {
			g.stage.y += (320 - snake.sprites[0].worldTransform.ty) / (40 - (+(Math.abs(320 - snake.sprites[0].worldTransform.ty) > 640)) * 39);
			g.stage.x += (416 - snake.sprites[0].worldTransform.tx) / (40 - (+(Math.abs(416 - snake.sprites[0].worldTransform.tx) > 832)) * 39);
			background.children.forEach(function(val) {
				val.y = (val.orig.y * 64 + g.stage.y)
					.mod(640 + 64) - g.stage.y - 64
				val.x = (val.orig.x * 64 + g.stage.x)
					.mod(832 + 64) - g.stage.x - 64
			})
			tiles.children.forEach(function(val) {
				val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672)
			})
			pause.handle(self, background);
			key.check([65, 37], function() {
				//Left
				if (direction == "u" || direction == "d" && predirection != "l") {
					predirection = "l"
				}
			});
			key.check([68, 39], function() {
				//Right
				if (direction == "u" || direction == "d" && predirection != "r") {
					predirection = "r"
				}
			});
			key.check([87, 38], function() {
				//Up
				if (direction == "r" || direction == "l" && predirection != "u") {
					predirection = "u"
				}
			});
			key.check([83, 40], function() {
				//Down
				if (direction == "r" || direction == "l" && predirection != "d") {
					predirection = "d"
				}
			});
			if (frames % 8 == 0) {
				direction = predirection;
				switch (direction) {
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
			}
			g.renderer.render(g.all);
		})
		return this;
	}
}