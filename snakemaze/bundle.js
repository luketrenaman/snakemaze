/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _keyPress = __webpack_require__(1);
	
	var _keyPress2 = _interopRequireDefault(_keyPress);
	
	__webpack_require__(2);
	
	var _fps = __webpack_require__(3);
	
	var _fps2 = _interopRequireDefault(_fps);
	
	var _levels = __webpack_require__(4);
	
	var _levels2 = _interopRequireDefault(_levels);
	
	var _menu = __webpack_require__(5);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _pause = __webpack_require__(8);
	
	var _pause2 = _interopRequireDefault(_pause);
	
	var _buildSnake = __webpack_require__(9);
	
	var _buildSnake2 = _interopRequireDefault(_buildSnake);
	
	var _map = __webpack_require__(10);
	
	var _map2 = _interopRequireDefault(_map);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//glpnasfasfasfsafsa
	//Initialize a global value g
	window.g = {};
	//Utilities
	
	//Level
	
	//Components
	
	//Tile rendering
	
	Number.prototype.mod = function (n) {
		return (this % n + n) % n;
	};
	_keyPress2.default.listen();
	g.renderer = PIXI.autoDetectRenderer(832, 640);
	g.renderer.backgroundColor = 0x444444;
	g.all = new PIXI.Container();
	document.body.appendChild(g.renderer.view);
	PIXI.loader.add("assets/snake-head.png").add("assets/rainbow.json").add("assets/snake-body.png").add("assets/snake-corner.png").add("assets/snake-tail.png").add("assets/grass.png").add("assets/flowers-1.png").add("assets/flowers-2.png").add("assets/rock.png").add("assets/gem-1.png").add("assets/gem-2.png").add("assets/gem-3.png").add("assets/level-1.png").add("assets/titlescreen.png").add("assets/start.png").add("assets/back.png").add("assets/music.png").add("assets/nomusic.png").load(fonts);
	
	function fonts() {
		WebFont.load({
			custom: {
				families: ['Pixel', 'pixelmono'],
				urls: ["/stylesheet.css"]
			},
			active: function active(e) {
				console.log("font loaded!");
				// now start setting up your PixiJS (or canvas) stuff!
				setup();
			}
		});
	}
	
	function setup() {
		//Build guidelines
		var textures = [PIXI.loader.resources["assets/grass.png"].texture, PIXI.loader.resources["assets/flowers-1.png"].texture, PIXI.loader.resources["assets/flowers-2.png"].texture, PIXI.loader.resources["assets/rock.png"].texture];
		//Button is a function that creates an interactive sprite at a certain position, and provide a callback
		(0, _menu2.default)();
		console.log(g.manager);
		g.manager.show("start"); //set to level for debug
		g.all.updateLayersOrder = function () {
			g.all.children.sort(function (a, b) {
				a.zOrder = a.zOrder || 0;
				b.zOrder = b.zOrder || 0;
				return b.zOrder - a.zOrder;
			});
		};
		g.newLevel = function (num) {
			if (_levels2.default[num] == undefined) return;
			//maze
			g.maze = _levels2.default[num];
			//stage
			g.stage = new PIXI.Container();
			g.stage.zOrder = -1;
			g.all.addChild(g.stage);
			g.stage.updateLayersOrder = function () {
				g.stage.children.sort(function (a, b) {
					a.zIndex = a.zIndex || 0;
					b.zIndex = b.zIndex || 0;
					return b.zIndex - a.zIndex;
				});
			};
			//give kill function
			this.kill = function () {
				loop.stop();
				g.all.removeChild(g.stage);
				g.all.removeChild(snake.counter);
				g.all.removeChild(pause.obj);
				g.manager.show("level");
			};
			this.death = function () {
				//Jam controls, explode snake
				loop.stop();
				//Create a new loop with no controls
				var n = 0;
				snake.counter.xvel = 0;
				var death = new _fps2.default(function (frames, self) {
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
								n++;
							} while (snake.locations[n].x === snake.locations[n + 1].x && snake.locations[n].y === snake.locations[n + 1].y);
						}
					}
					if (!isNaN(snake.sprites[n].worldTransform.ty) && !isNaN(snake.sprites[n].worldTransform.tx)) {
						g.stage.y += (320 - snake.sprites[n].worldTransform.ty) / 40;
						g.stage.x += (416 - snake.sprites[n].worldTransform.tx) / 40;
					}
					background.children.forEach(function (val) {
						val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64;
						val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64;
					});
					tiles.children.forEach(function (val) {
						val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672);
					});
					g.renderer.render(g.all);
				});
			};
			//Create a pause menu
			var pause = new _pause2.default();
			//Hide the sound controls
			g.soundManager.visible = false;
			//Build the background, which is like the grass and such
			var bias = [80, 90, 100, 104];
			var background = new PIXI.Container();
			background.zIndex = 500;
			for (var i = -2; i < 26; i++) {
				for (var j = -2; j < 20; j++) {
					var rand = Math.random() * bias[bias.length - 1];
					var x = new PIXI.Sprite(textures[bias.indexOf(bias.filter(function (val) {
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
			var tiles = new PIXI.Container();
			tiles.zIndex = -1;
			g.stage.addChild(tiles);
			(0, _map2.default)(g.maze.data, tiles);
			g.stage.addChild(background);
			var snake = new _buildSnake2.default();
			snake.layer();
			var direction = snake.direction;
			var predirection = snake.direction;
			g.all.updateLayersOrder();
			var start = 1;
			//Start by moving the snake to allow instantaneous snake positioning
			for (var _i = 0; _i < 2; _i++) {
				switch (_levels2.default[num].snake.direction) {
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
			var countdown = new PIXI.Text("3", {
				font: "52px Pixel",
				fill: "white"
			});
			g.all.addChild(countdown);
			countdown.y = 320;
			countdown.x = 416;
			var loop = new _fps2.default(function (frames, self) {
				g.stage.y += (320 - snake.sprites[0].worldTransform.ty) / (40 - +(Math.abs(320 - snake.sprites[0].worldTransform.ty) > 640) * 39);
				g.stage.x += (416 - snake.sprites[0].worldTransform.tx) / (40 - +(Math.abs(416 - snake.sprites[0].worldTransform.tx) > 832) * 39);
				background.children.forEach(function (val) {
					val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64;
					val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64;
				});
				tiles.children.forEach(function (val) {
					val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672);
				});
				if (frames % 8 == 0 && frames > 180) {
					pause.handle(self, background);
					_keyPress2.default.check([65, 37], function () {
						//Left
						if (direction == "u" || direction == "d" && predirection != "l") {
							predirection = "l";
						}
					});
					_keyPress2.default.check([68, 39], function () {
						//Right
						if (direction == "u" || direction == "d" && predirection != "r") {
							predirection = "r";
						}
					});
					_keyPress2.default.check([87, 38], function () {
						//Up
						if (direction == "r" || direction == "l" && predirection != "u") {
							predirection = "u";
						}
					});
					_keyPress2.default.check([83, 40], function () {
						//Down
						if (direction == "r" || direction == "l" && predirection != "d") {
							predirection = "d";
						}
					});
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
				} else {
					if (Math.ceil(3 - frames / 60) === 0) {
						countdown.visible = false;
					} else {
						countdown.setText(Math.ceil(3 - frames / 60));
					}
				}
				g.renderer.render(g.all);
			});
			return this;
		};
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = new function () {
	    var a = this;
	    this.map = [];
	    this.tethers = [];
	    this.listen = function () {
	        document.onkeydown = function (e) {
	            e = e || window.event;
	            e = e.which || e.keyCode || 0;
	            if (a.map.indexOf(e) == -1) {
	                a.map.push(e);
	            }
	            a.tethers.forEach(function (tether, index) {
	                if (tether.type == "down") {
	                    if (e === tether.key) {
	                        tether.func();
	                        if (!tether.perma) a.tethers.splice(index, 1);
	                    }
	                }
	            });
	        };
	        document.onkeyup = function (e) {
	            e = e || window.event;
	            e = e.which || e.keyCode || 0;
	            // use e.keyCode
	            if (a.map.indexOf(e) != -1) {
	                a.map.splice(a.map.indexOf(e), 1);
	            }
	            a.tethers.forEach(function (tether, index) {
	                if (tether.type == "up") {
	                    if (e === tether.key) {
	                        tether.func();
	                        if (!tether.perma) a.tethers.splice(index, 1);
	                    }
	                }
	            });
	        };
	    };
	    this.check = function (key, callback, not) {
	        if ((typeof key === "undefined" ? "undefined" : _typeof(key)) != "object") {
	            key = [key];
	        }
	        for (var i = 0; i < key.length; i++) {
	            if (a.map.indexOf(key[i]) != -1) {
	                callback();
	                i = key.length;
	                return;
	            }
	        }
	        if (not !== undefined) {
	            not();
	        }
	    };
	    this.waitUp = function (key, func, perma) {
	        if (perma === undefined) {
	            perma = false;
	        }
	        a.tethers.push({
	            "key": key,
	            "func": func,
	            "type": "up",
	            "perma": perma
	        });
	    };
	    this.waitDown = function (key, func, perma) {
	        if (perma === undefined) {
	            perma = false;
	        }
	        a.tethers.push({
	            "key": key,
	            "func": func,
	            "type": "down",
	            "perma": perma
	        });
	    };
	}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	// Warn if overriding existing method
	if (Array.prototype.equals) console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
	// attach the .equals method to Array's prototype to call it on any array
	Array.prototype.equals = function (array) {
	    // if the other array is a falsy value, return
	    if (!array) return false;
	
	    // compare lengths - can save a lot of time 
	    if (this.length != array.length) return false;
	
	    for (var i = 0, l = this.length; i < l; i++) {
	        // Check if we have nested arrays
	        if (this[i] instanceof Array && array[i] instanceof Array) {
	            // recurse into the nested arrays
	            if (!this[i].equals(array[i])) return false;
	        } else if (this[i] != array[i]) {
	            // Warning - two different object instances will never be equal: {x:20} != {x:20}
	            return false;
	        }
	    }
	    return true;
	};
	// Hide method from for-in loops
	Object.defineProperty(Array.prototype, "equals", { enumerable: false });

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (cb) {
	    this.going = true;
	    this.start = function () {
	        this.going = true;
	        requestAnimationFrame(draw);
	    };
	    this.resume = this.start;
	    this.stop = function () {
	        this.going = false;
	    };
	    this.pause = this.stop;
	    this.toggle = function () {
	        this.going = !this.going;
	    };
	    this.restart = function () {
	        ct = 0;
	    };
	    var a = this;
	    var ct = 0;
	
	    function draw() {
	        if (a.going) {
	            requestAnimationFrame(draw);
	            ct++;
	            cb(ct, a);
	        }
	    }
	    draw();
	    return this;
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = [{ "mode": "normal", "snake": { "x": 16, "y": 2, "direction": "r" }, "data": [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]] }, { "mode": "normal", "snake": { "x": 14, "y": 6, "direction": "u" }, "data": [[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], [1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1], [1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1], [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1], [1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1], [1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1], [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1], [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1], [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]] }, { "mode": "normal", "snake": { "x": 12, "y": 76, "direction": "l" }, "data": [[1, { "x": 1, "y": 0, "id": "2", "target": "1", "direction": "u" }, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, { "x": 10, "y": 74, "id": "1", "target": "2", "direction": "d" }, 1]] }, { "mode": "crash", "snake": { "x": 2, "y": 16, "direction": "u" }, "end": { "x": 2, "y": 18 }, "data": [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1], [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]], "fruit": [] }, { "mode": "normal", "snake": { "x": 2, "y": 16, "direction": "r" }, "data": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1], [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] }];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function () {
	    g.manager = new menuManager();
	    // -- HANDLE MUSIC --
	    g.soundManager = new PIXI.Container();
	    g.soundManager.x = 832 - 128;
	    g.soundManager.y = 640 - 64;
	    g.soundManager.zOrder = -4;
	    var music = new PIXI.Sprite(PIXI.loader.resources["assets/music.png"].texture);
	    music.enabled = true;
	    (0, _button2.default)(music, 0, 0, function () {
	        if (music.enabled) {
	            music.setTexture(PIXI.loader.resources["assets/nomusic.png"].texture);
	        } else {
	            music.setTexture(PIXI.loader.resources["assets/music.png"].texture);
	        }
	        music.enabled = !music.enabled;
	    });
	    var sounds = new PIXI.Sprite(_shapes2.default.rectangle(64, 64, "#00f"));
	    (0, _button2.default)(sounds, 64, 0, function () {
	        //Handle sfx disable
	        console.log("sfx");
	    });
	    g.soundManager.addChild(music);
	    g.soundManager.addChild(sounds);
	    g.all.addChild(g.soundManager);
	    // -- START SCREEN --
	    var startScreen = new menu("start", true);
	    var background = new PIXI.Sprite(PIXI.loader.resources["assets/titlescreen.png"].texture);
	    startScreen.addChild(background);
	    var start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture);
	    startScreen.addChild(start);
	    (0, _button2.default)(start, 64 * 4 + 32, 64 * 6, function () {
	        g.manager.show("level");
	    });
	    // -- LEVEL SELECT --
	    var levelSelect = new menu("level", true);
	
	    var _loop = function _loop(i) {
	        var _loop2 = function _loop2(j) {
	
	            var lev = new PIXI.Sprite(PIXI.loader.resources["assets/level-1.png"].texture);
	            levelSelect.addChild(lev);
	            (0, _button2.default)(lev, i * 128 + 128, j * 128 + 128, function () {
	                g.level = new g.newLevel(i + j * 5);
	            });
	        };
	
	        for (var j = 0; j < 2; j++) {
	            _loop2(j);
	        }
	    };
	
	    for (var i = 0; i < 5; i++) {
	        _loop(i);
	    }
	    // -- QUIT BUTTON --
	    var exit = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
	    levelSelect.addChild(exit);
	    (0, _button2.default)(exit, 0, 0, function () {
	        g.manager.show("start");
	    });
	    // -- MENU TO SHOW ON DEATH --
	    //TODO
	    var deathMenu = new menu("death", false);
	    var deathBase = new PIXI.Sprite(_shapes2.default.rectangle(64 * 6, 64 * 4, "#000"));
	    deathMenu.zOrder = -4;
	    deathMenu.addChild(deathBase);
	};
	
	var _shapes = __webpack_require__(6);
	
	var _shapes2 = _interopRequireDefault(_shapes);
	
	var _button = __webpack_require__(7);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var menuManager = function () {
	    function menuManager() {
	        _classCallCheck(this, menuManager);
	
	        this.menus = [];
	    }
	
	    _createClass(menuManager, [{
	        key: "show",
	        value: function show(menuName) {
	            this.hide();
	            this.menus.forEach(function (val) {
	                if (val.name === menuName) {
	                    val.visible = true;
	                    g.soundManager.visible = val.sound;
	                }
	            });
	            g.renderer.render(g.all);
	        }
	    }, {
	        key: "hide",
	        value: function hide() {
	            this.menus.forEach(function (val) {
	                val.visible = false;
	            });
	        }
	    }, {
	        key: "push",
	        value: function push(val) {
	            this.menus.push(val);
	        }
	    }]);
	
	    return menuManager;
	}();
	
	var menu = function (_PIXI$Container) {
	    _inherits(menu, _PIXI$Container);
	
	    function menu(name, sound) {
	        _classCallCheck(this, menu);
	
	        var _this = _possibleConstructorReturn(this, (menu.__proto__ || Object.getPrototypeOf(menu)).call(this));
	
	        _this.name = name;
	        _this.sound = sound;
	        g.manager.push(_this);
	        g.all.addChild(_this);
	        return _this;
	    }
	
	    return menu;
	}(PIXI.Container);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = new function () {
	    var a = this;
	    this.renderer = "";
	    this.canvas = function (width, height) {
	        var canvas = document.createElement('canvas');
	        canvas.width = width;
	        canvas.height = height;
	        var ctx = canvas.getContext("2d");
	        return {
	            "canvas": canvas,
	            "ctx": ctx
	        };
	    };
	    this.rectangle = function (width, height, color) {
	        var b = a.canvas(width, height);
	        b.ctx.fillStyle = color;
	        b.ctx.fillRect(0, 0, width, height);
	        return PIXI.Texture.fromCanvas(b.canvas);
	    };
	    this.circle = function (radius, color) {
	        var b = a.canvas(radius * 2, radius * 2);
	        b.ctx.fillStyle = color;
	        b.ctx.beginPath();
	        b.ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
	        b.ctx.fill();
	        return PIXI.Texture.fromCanvas(b.canvas);
	    };
	}();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (sprite, x, y, func) {
	    sprite.buttonMode = true;
	    sprite.interactive = true;
	    sprite.x = x;
	    sprite.y = y;
	    sprite.on('click', function () {
	        func();g.renderer.render(g.all);
	    });
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shapes = __webpack_require__(6);
	
	var _shapes2 = _interopRequireDefault(_shapes);
	
	var _keyPress = __webpack_require__(1);
	
	var _keyPress2 = _interopRequireDefault(_keyPress);
	
	var _button = __webpack_require__(7);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    /*
	    */
	    function _class() {
	        var _this = this;
	
	        _classCallCheck(this, _class);
	
	        var a = this;
	        var pauseScreen = new PIXI.Sprite(_shapes2.default.rectangle(832, 640, "rgba(44, 62, 80,0.7)"));
	        pauseScreen.visible = false;
	        var text = new PIXI.Text("Game paused", {
	            font: "52px Pixel",
	            fill: "white"
	        });
	        text.anchor.x = 0.5;
	        text.x = 416;
	        text.y = 200;
	        pauseScreen.addChild(text);
	        pauseScreen.zOrder = -3;
	        this.obj = pauseScreen;
	        this.allow = true;
	        this.veto = false;
	        g.all.addChild(this.obj);
	        var abort = new PIXI.Sprite(_shapes2.default.rectangle(64 * 5, 64 * 2, "#000"));
	        (0, _button2.default)(abort, 4 * 64, 5 * 64, function () {
	            g.level.kill();
	            _this.veto = true;
	            console.log(_this);
	        });
	        this.obj.addChild(abort);
	    }
	
	    _createClass(_class, [{
	        key: "handle",
	        value: function handle(obj, background) {
	            var a = this;
	            function wait() {
	                if (!a.veto) {
	                    obj.start();
	                    a.obj.visible = false;
	                    g.soundManager.visible = false;
	                    background.zIndex = 500;
	                    g.all.updateLayersOrder();
	                }
	            }
	
	            function allow() {
	                if (!a.veto) {
	                    a.allow = true;
	                }
	            }
	            _keyPress2.default.check(80, function () {
	                if (a.allow) {
	                    console.log("SHOW");
	                    a.obj.visible = true;
	                    g.soundManager.visible = true;
	                    //background.zIndex = -2;
	                    a.obj.zIndex = -3;
	                    g.all.updateLayersOrder();
	                    a.allow = false;
	                    g.renderer.render(g.stage);
	                    obj.stop();
	                    _keyPress2.default.waitUp(80, function () {
	                        _keyPress2.default.waitDown(80, wait);
	                        _keyPress2.default.waitUp(80, allow);
	                    });
	                }
	            });
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;
	;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shapes = __webpack_require__(6);
	
	var _shapes2 = _interopRequireDefault(_shapes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function segment(type) {
	    //Layering for segments, positioning, etc.
	    var obj = new PIXI.Sprite(PIXI.loader.resources["assets/snake-" + type + ".png"].texture);
	    obj.scale.x = 0.5;
	    obj.scale.y = 0.5;
	    obj.anchor.x = 0.5;
	    obj.anchor.y = 0.5;
	    obj.x = -16 - 416;
	    obj.y = -16 - 320;
	    g.stage.addChild(obj);
	    if (type === "head" || type === "tail") {
	        obj.zIndex = 0;
	    }
	    obj.segmentType = type;
	    return obj;
	}
	
	var buildSnake = function () {
	    function buildSnake() {
	        _classCallCheck(this, buildSnake);
	
	        this.exit = false;
	        this.locations = [{ x: g.maze.snake.x, y: g.maze.snake.y }, { x: g.maze.snake.x, y: g.maze.snake.y }, { x: g.maze.snake.x, y: g.maze.snake.y }];
	        this.sprites = [];
	        this.gems = [];
	        this.sprites.push(new segment("head"));
	        this.sprites.push(new segment("body"));
	        this.sprites.push(new segment("tail"));
	        g.stage.y += 320 - this.sprites[0].worldTransform.ty;
	        g.stage.x += 416 - this.sprites[0].worldTransform.tx;
	        this.counter = new PIXI.Container();
	        this.counter.zOrder = -2;
	        this.counter.x = 832 - 32 * 4;
	        this.counter.y = 640 - 32 * 3;
	        this.counter.addChild(new PIXI.Sprite(_shapes2.default.rectangle(128, 96, "rgba(44, 62, 80,0.7)")));
	        this.counter.rules = {
	            "current": 0,
	            "max": 25
	            //Generate icons for the counter
	        };for (var i = 0; i < 3; i++) {
	            var icon = new PIXI.Sprite(PIXI.loader.resources["assets/gem-" + (i + 1) + ".png"].texture);
	            icon.scale.x = 0.5;
	            icon.scale.y = 0.5;
	            icon.x = 8 + i * 40;
	            icon.y = 8;
	            this.counter.addChild(icon);
	        }
	        var count = new PIXI.Text("00", {
	            font: "52px pixelmono",
	            fill: "white"
	        });
	        count.y = 52;
	        count.x = 8;
	        this.counter.display = count;
	        this.counter.addChild(count);
	        var total = new PIXI.Text("/" + (this.counter.rules.max < 10 ? "0" + this.counter.rules.max : this.counter.rules.max), {
	            font: "30px pixelmono",
	            fill: "white"
	        });
	        total.x = count.width + 16;
	        total.y = 52;
	        this.counter.addChild(total);
	        g.all.addChild(this.counter);
	        if (g.maze.mode === "normal") {
	            this.fruit();
	            this.fruit();
	            this.fruit();
	        } else {
	            this.exit = true;
	            this.exitSprite = new PIXI.Sprite(PIXI.loader.resources["assets/rainbow.json"].textures["rainbow1.png"]);
	            this.exitSprite.cycle = 1;
	            this.exitSprite.x = g.maze.end.x * 32;
	            this.exitSprite.y = g.maze.end.y * 32;
	            this.exitSprite.scale.x = 1 / 6;
	            this.exitSprite.scale.y = 1 / 6;
	            this.exitSprite.coord = g.maze.end;
	            this.exitSprite.zIndex = 1;
	            g.stage.addChild(this.exitSprite);
	        }
	        this.direction = g.maze.snake.direction;
	    }
	
	    _createClass(buildSnake, [{
	        key: "move",
	        value: function move(x, y, portal) {
	            for (var i = this.locations.length - 1; i > 0; i--) {
	                this.locations[i] = Object.assign({}, this.locations[i - 1]);
	            }
	            this.locations[0].x += x;
	            this.locations[0].y -= y;
	            this.sprites[0].rotation = (y / 2 + x / 2 + (x != 0 ? 0.5 : 0) + .5) * Math.PI;
	            for (var _i = 0; _i < this.sprites.length; _i++) {
	                //Define location variables
	                var p = this.locations[_i - 1]; //previous
	                var c = this.locations[_i]; //current
	                var a = this.locations[_i + 1]; //after
	                //Position segments based on location
	                this.sprites[_i].x = c.x * 32 + 16;
	                this.sprites[_i].y = c.y * 32 + 16;
	                //Calculate location based on the direction of motion
	                if (_i !== 0) {
	                    if (this.sprites[_i].segmentType === "tail") {
	                        var ct = 1;
	                        while (c.x === p.x && c.y === p.y) {
	                            ct++;
	                            p = this.locations[_i - ct];
	                        }
	                    }
	                    var _x = p.x - c.x;
	                    var _y = c.y - p.y;
	                    this.sprites[_i].rotation = (_y / 2 + _x / 2 + (_x != 0 ? 0.5 : 0) + .5) * Math.PI;
	                }
	                //An array of right turn coordinates
	                var right = [[[0, 1], [1, 0]], [[1, 0], [0, -1]], [[0, -1], [-1, 0]], [[-1, 0], [0, 1]]];
	                //If a body segment...
	                if (this.sprites[_i].segmentType === "body") {
	                    this.sprites[_i].visible = !(this.locations[this.locations.length - 1].x === this.locations[_i].x && this.locations[this.locations.length - 1].y === this.locations[_i].y);
	                    //Test for corners, if not a corner, become a body segment
	                    if (c.x === p.x && p.x === a.x || c.y === p.y && p.y === a.y) {
	                        this.sprites[_i].setTexture(PIXI.loader.resources["assets/snake-body.png"].texture);
	                    } else {
	                        //Check for right corners by finding comparison between values
	                        var compOne = [c.x - p.x, c.y - p.y];
	                        var compTwo = [a.x - c.x, a.y - c.y];
	                        var rightBool = false;
	                        //Loop through right turns...
	                        right.forEach(function (val) {
	                            if (compOne.equals(val[0]) && compTwo.equals(val[1])) {
	                                rightBool = true;
	                            }
	                        });
	                        //If there is a right turn, rotate accordingly
	                        if (rightBool) {
	                            this.sprites[_i].rotation += Math.PI * .5;
	                        }
	                        //Since this is a corner apply the corner texture
	                        this.sprites[_i].setTexture(PIXI.loader.resources["assets/snake-corner.png"].texture);
	                    }
	                }
	            }
	            this.collide();
	        }
	    }, {
	        key: "eat",
	        value: function eat() {
	            var a = this;
	            var piece = new segment("body");
	            this.sprites.splice(this.sprites.length - 1, 0, piece);
	            this.locations.splice(this.locations.length - 1, 0, this.locations[this.locations.length - 2]);
	            piece.x = (this.locations.length - 1).x * 32;
	            piece.y = (this.locations.length - 1).y * 32;
	            this.layer();
	            this.counter.rules.current++;
	            this.counter.display.text = this.counter.rules.current < 10 ? "0" + this.counter.rules.current : this.counter.rules.current;
	            if (this.counter.rules.current == this.counter.rules.max) {
	                var _check = function _check() {
	                    var spawn = {
	                        x: Math.floor(g.maze.data[0].length * Math.random()),
	                        y: Math.floor(g.maze.data.length * Math.random())
	                    };
	                    var safe = a.locations.every(function (val) {
	                        return !(val.x === spawn.x && val.y === spawn.y);
	                    }) && g.maze.data[spawn.y][spawn.x] === 2;
	                    if (safe) {
	                        a.exit = true;
	                        a.exitSprite = new PIXI.Sprite(PIXI.loader.resources["assets/rainbow.json"].textures["rainbow1.png"]);
	                        a.exitSprite.cycle = 1;
	                        a.exitSprite.x = spawn.x * 32;
	                        a.exitSprite.y = spawn.y * 32;
	                        console.log(spawn);
	                        a.exitSprite.scale.x = 1 / 6;
	                        a.exitSprite.scale.y = 1 / 6;
	                        a.exitSprite.coord = spawn;
	                        a.exitSprite.zIndex = 1;
	                        g.stage.addChild(a.exitSprite);
	                    } else {
	                        _check();
	                    }
	                };
	
	                var len = a.gems.length;
	                for (var i = len - 1; i >= 0; i--) {
	                    g.stage.removeChild(a.gems[i]);
	                    a.gems.splice(i, 1);
	                }
	
	                _check();
	            }
	        }
	    }, {
	        key: "layer",
	        value: function layer() {
	            for (var i = 0; i < this.sprites.length; i++) {
	                this.sprites[i].zIndex = 1;
	            }
	            g.stage.updateLayersOrder();
	        }
	    }, {
	        key: "collide",
	        value: function collide() {
	            var _this = this;
	
	            var a = this;
	            var death = false;
	            var collide = false;
	            for (var i = 1; i < this.locations.length; i++) {
	                if (this.locations[0].x === this.locations[i].x && this.locations[0].y === this.locations[i].y) {
	                    death = true;
	                }
	            }
	            if (g.maze.data[this.locations[0].y] != undefined && g.maze.data[this.locations[0].y][this.locations[0].x] === 1) {
	                death = true;
	            }
	            if (g.maze.data[this.locations[0].y] != undefined && _typeof(g.maze.data[this.locations[0].y][this.locations[0].x]) === "object") {
	                var portal = g.maze.data[this.locations[0].y][this.locations[0].x];
	                var target = void 0;
	                g.maze.data.forEach(function (val) {
	                    val.forEach(function (m) {
	                        if (m.id === portal.target) {
	                            target = m;
	                        }
	                    });
	                });
	                console.log(target);
	                this.locations[0].x = target.x;
	                this.locations[0].y = target.y;
	                this.direction = target.direction;
	                switch (target.direction) {
	                    case "left":
	                        this.move(-1, 0);;
	                        break;
	                    case "right":
	                        this.move(1, 0);
	                        break;
	                    case "up":
	                        this.move(0, -1);
	                        break;
	                    case "down":
	                        this.move(0, 1);
	                        break;
	                }
	                return;
	            }
	            if (death) {
	                //TODO = HANDLE DEATH OF THE SNAKE WITH A DEATH SCREEN
	
	                collide = true;
	                g.level.death();
	            }
	            if (this.counter.rules.current != this.counter.rules.max) {
	                this.gems.forEach(function (gem) {
	                    if (_this.locations[0].x === gem.coord.x && _this.locations[0].y === gem.coord.y) {
	                        a.gems.splice(a.gems.indexOf(gem), 1);
	                        g.stage.removeChild(gem);
	                        a.fruit();
	                        a.eat();
	                    }
	                });
	            }
	            if (this.exit) {
	                this.exitSprite.cycle++;
	                this.exitSprite.cycle %= 8;
	                this.exitSprite.setTexture(PIXI.loader.resources["assets/rainbow.json"].textures["rainbow" + this.exitSprite.cycle + ".png"]);
	                if (this.locations[0].x === this.exitSprite.coord.x && this.locations[0].y === this.exitSprite.coord.y) {
	                    //TODO = WIN SCREEN
	                    collide = true;
	                    g.level.death();
	                }
	            }
	            return collide;
	        }
	    }, {
	        key: "fruit",
	        value: function fruit() {
	            var a = this;
	
	            function check() {
	                var spawn = {
	                    x: Math.floor(g.maze.data[0].length * Math.random()),
	                    y: Math.floor(g.maze.data.length * Math.random())
	                };
	                var safe = a.locations.every(function (val) {
	                    return !(val.x === spawn.x && val.y === spawn.y);
	                }) && a.gems.every(function (val) {
	                    return !(val.coord.x === spawn.x && val.coord.y === spawn.y);
	                }) && g.maze.data[spawn.y][spawn.x] === 2;
	                if (safe) {
	                    var gem = new PIXI.Sprite(PIXI.loader.resources["assets/gem-" + Math.ceil(Math.random() * 3) + ".png"].texture);
	                    gem.x = spawn.x * 32;
	                    gem.y = spawn.y * 32;
	
	                    //
	                    gem.scale.x = 0.5;
	                    gem.scale.y = 0.5;
	                    //
	                    gem.coord = spawn;
	                    gem.zIndex = 1;
	                    a.gems.push(gem);
	                    g.stage.addChild(gem);
	                } else {
	                    check();
	                }
	            }
	            check();
	        }
	    }]);
	
	    return buildSnake;
	}();
	
	exports.default = buildSnake;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	module.exports = function (arr, tiles) {
	    //Map size is 20 blocks tall and 32 wide
	    //0 is grass 1 is dirt
	    function getName(x, y) {
	        var l = arr[y][x - 1] === 1,
	            t = arr[y - 1] && arr[y - 1][x] === 1,
	            r = arr[y][x + 1] === 1,
	            b = arr[y + 1] && arr[y + 1][x] === 1,
	            tl = arr[y - 1] && arr[y - 1][x - 1] === 1,
	            tr = arr[y - 1] && arr[y - 1][x + 1] === 1,
	            br = arr[y + 1] && arr[y + 1][x + 1] === 1,
	            bl = arr[y + 1] && arr[y + 1][x - 1] === 1;
	        return [l & t ? +tl : 0, +t || 0, r & t ? +tr : 0, +l, +r, l & b ? +bl : 0, +b || 0, r & b ? +br : 0];
	    }
	    var debug = [];
	    for (var i = 0; i < arr.length; i++) {
	        arr[i].forEach(function (cel, j) {
	            var cell = arr[i][j];
	            if ((typeof cell === "undefined" ? "undefined" : _typeof(cell)) === "object") {
	                cell = new PIXI.Sprite(__webpack_require__(6).rectangle(32, 32, "#fff"));
	                cell.x = j * 32;
	                cell.y = i * 32;
	                tiles.addChild(cell);
	            } else {
	                switch (cell) {
	                    case " ":
	                    case 0:
	                    case 2:
	
	                        break;
	                    case 1:
	                        //PIXI.loader.resources["assets/tile.png"].texture
	                        cell = new PIXI.Sprite(__webpack_require__(11)(getName(j, i)));
	                        cell.x = j * 32;
	                        cell.y = i * 32;
	                        tiles.addChild(cell);
	                        break;
	                }
	            }
	        });
	    }
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (x, dbg) {
	    var shapes = __webpack_require__(6);
	    var lighten = __webpack_require__(12);
	    var canvas = shapes.canvas(32, 32);
	    var condition = false;
	    //5d2e0d
	    //228B22
	    //x,y,width,height
	    var bounds = "011112\n3    4\n3    4\n3    4\n3    4\n566667".split("\n").map(function (val) {
	        return val.split("");
	    });
	    for (var i = 0; i < 6; i++) {
	        for (var j = 0; j < 6; j++) {
	            if (x === null) {
	                canvas.ctx.fillStyle = "#18212b";
	            } else {
	                if (x[bounds[Math.floor(j)][Math.floor(i)]] === 0) {
	                    //Grass
	                    canvas.ctx.fillStyle = "#" + lighten("006600", Math.random() * -5);
	                } else {
	                    //Not Grass
	                    canvas.ctx.fillStyle = "#" + lighten("006600", Math.random() * 10 + 5);
	                }
	            }
	            canvas.ctx.fillRect(i * 5.333, j * 5.333, 6, 6);
	        }
	    }
	    return PIXI.Texture.fromCanvas(canvas.canvas);
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (color, percent) {
			var num = parseInt(color, 16),
			    amt = Math.round(2.55 * percent),
			    R = (num >> 16) + amt,
			    B = (num >> 8 & 0x00FF) + amt,
			    G = (num & 0x0000FF) + amt;
	
			return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
	};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map