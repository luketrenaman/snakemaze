//glpnasfasfasfsafsa
//Initialize a global value g
!function(a,b,c,d,e,f,g,h,i){function j(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=s&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=s&f+1],c=c*d+h[s&(h[f]=h[g=s&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function k(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(k(a[c],b-1))}catch(f){}return d.length?d:"string"==e?a:a+"\0"}function l(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return n(b)}function m(c){try{return o?n(o.randomBytes(d)):(a.crypto.getRandomValues(c=new Uint8Array(d)),n(c))}catch(e){return[+new Date,a,(c=a.navigator)&&c.plugins,a.screen,n(b)]}}function n(a){return String.fromCharCode.apply(0,a)}var o,p=c.pow(d,e),q=c.pow(2,f),r=2*q,s=d-1,t=c["seed"+i]=function(a,f,g){var h=[];f=1==f?{entropy:!0}:f||{};var o=l(k(f.entropy?[a,n(b)]:null==a?m():a,3),h),s=new j(h);return l(n(s.S),b),(f.pass||g||function(a,b,d){return d?(c[i]=a,b):a})(function(){for(var a=s.g(e),b=p,c=0;q>a;)a=(a+c)*d,b*=d,c=s.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b},o,"global"in f?f.global:this==c)};if(l(c[i](),b),g&&g.exports){g.exports=t;try{o=require("crypto")}catch(u){}}else h&&h.amd&&h(function(){return t})}(this,[],Math,256,6,52,"object"==typeof module&&module,"function"==typeof define&&define,"random");
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
import shapes from "./drawing/shapes";
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
}; 
key.listen(); 
window.g = {} as globalController;
g.renderer = PIXI.autoDetectRenderer(832, 640);
g.renderer.backgroundColor = 0x444444;
g.all = new PIXI.Container();
document.body.appendChild(g.renderer.view)
PIXI.loader.add("assets/menu.png").add("assets/refresh.png").add("assets/sound.png").add("assets/nosound.png").add("assets/background-incomplete.png").add("assets/background-complete.png").add("assets/snake-head.png").add("assets/rainbow.json").add("assets/snake-body.png").add("assets/snake-corner.png").add("assets/snake-tail.png").add("assets/grass.png").add("assets/flowers-1.png").add("assets/flowers-2.png").add("assets/rock.png").add("assets/gem-1.png").add("assets/gem-2.png").add("assets/gem-3.png").add("assets/level-1.png").add("assets/titlescreen.png").add("assets/start.png").add("assets/back.png").add("assets/music.png").add("assets/nomusic.png").load(fonts);
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
		Math.seedrandom(num.toString() + "snak");
		key.mostRecentKey = null;
		g.manager.num = num;
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
		function camera(diff){
			if(calcy){
				g.stage.y += diff * 100 * ((320 - snake.sprites[0].worldTransform.ty) / (40 - (+(Math.abs(320 - snake.sprites[0].worldTransform.ty) > 640)) * 39));
			}
			if(calcx){
				g.stage.x += diff * 100 * ((416 - snake.sprites[0].worldTransform.tx) / (40 - (+(Math.abs(416 - snake.sprites[0].worldTransform.tx) > 832)) * 39));
			}
			g.stage.y = fixy(g.stage.y);
			g.stage.x = fixx(g.stage.x);
		}
		let calcx = true;
		let calcy = true;
		//give kill function
		this.kill = () => {
			g.all.removeChild(snake.counter);
			loop.stop();
			gameTick.stop();
			if(g.level.endLoop){
				g.level.endLoop.stop();
			}
			g.all.removeChild(g.stage);
			g.all.removeChild(pause.obj);
		}
		this.end = function(condition) {
			//Either "victory" or "death"
			//Jam controls, explode snake
			loop.stop();
			gameTick.stop();
			//Create a new loop with no controls
			let n = 0;
			snake.counter.xvel = 0;
			g.level.endLoop = new fps(function(frames, self,diff) {
				//make the portal continue to animate
				if (snake.exit && frames % 10 === 0) {
					snake.exitSprite.cycle++;
					snake.exitSprite.cycle %= 8;
					snake.exitSprite.setTexture(PIXI.loader.resources["assets/rainbow.json"].textures["rainbow" + snake.exitSprite.cycle + ".png"]);
				}
				snake.counter.x -= 100 * diff * (snake.counter.x - 416 + snake.counter.width/2) / 20;
				snake.counter.y -= 100 * diff * (snake.counter.y - 500) / 20;
				if(condition === "victory"){
					g.manager.show("victory");
					if(snake.sprites.length !== n - 1){
						if (frames % 10 === 0){
							g.stage.removeChild(snake.sprites[n]);
							snake.checkMove();
							n++;
						}
					}
				}
				if(condition === "death"){
					g.manager.show("death");
					if (frames % 10 === 0) {
						if (snake.sprites.length - 1 === n) {
							snake.sprites[n].tint = 0x000;
						} else {
							do {
								snake.sprites[n].tint = 0x000;
								n++
							} while (snake.locations[n].x === snake.locations[n + 1].x && snake.locations[n].y === snake.locations[n + 1].y)
						}
					}
				}
				if (snake.sprites[n]) {
					camera(diff);
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
		},130);
		g.stage.x = -(snake.sprites[0].x -416);
		g.stage.y = -(snake.sprites[0].y - 320);
		//this render needs to be invisible
		//derive world transform some other way
		g.stage.x = fixx(g.stage.x+16);
		g.stage.y = fixy(g.stage.y-16);
		g.stage.x = fixx(g.stage.x-16);
		g.stage.y = fixy(g.stage.y+16);
		g.renderer.render(g.all);
		let loop = new fps(function(frames, self,diff) {
			countdown.x = -g.stage.x + 416;
			countdown.y = -g.stage.y + 320;

			camera(diff);
			//
            background.children.forEach(function(val) {
				val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64
				val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64
			})
			tiles.children.forEach(function(val) {
				val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672)
			})
			g.renderer.render(g.all);
			pause.handle(self, gameTick,background);
		})
		return this;
	}
}