/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./snakemaze/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./snakemaze/src/components/buildSnake.ts":
/*!************************************************!*\
  !*** ./snakemaze/src/components/buildSnake.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var shapes_1 = __webpack_require__(/*! ../drawing/shapes */ "./snakemaze/src/drawing/shapes.ts");
var key_press_1 = __webpack_require__(/*! ../utilities/key-press */ "./snakemaze/src/utilities/key-press.ts");
var Segment = /** @class */ (function (_super) {
    __extends(Segment, _super);
    function Segment(type) {
        var _this = 
        //Layering for segments, positioning, etc.
        _super.call(this, PIXI.loader.resources["assets/snake-" + type + ".png"].texture) || this;
        _this.scale.x = 0.5;
        _this.scale.y = 0.5;
        _this.anchor.x = 0.5;
        _this.anchor.y = 0.5;
        _this.x = -16 - 416;
        _this.y = -16 - 320;
        g.stage.addChild(_this);
        if (type === "head" || type === "tail") {
            _this.zIndex = 0;
        }
        _this.segmentType = type;
        return _this;
    }
    return Segment;
}(PIXI.Sprite));
var ab = new PIXI.Sprite(shapes_1["default"].rectangle(128, 96, "rgba(44, 62, 80,0.7)"));
var Counter = /** @class */ (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        var _this = _super.call(this, shapes_1["default"].rectangle(128, 96, "rgba(44, 62, 80,0.7)")) || this;
        _this.zOrder = -2;
        _this.x = 832 - 32 * 4; //position in bottom right
        _this.y = 640 - 32 * 3; //position in bottom right
        _this.rules = {
            current: 0,
            max: 25
        };
        //Generate icons for the counter
        for (var i = 0; i < 3; i++) {
            var icon = new PIXI.Sprite(PIXI.loader.resources["assets/gem-" + (i + 1) + ".png"].texture);
            icon.scale.x = 0.5;
            icon.scale.y = 0.5;
            icon.x = 8 + i * 40;
            icon.y = 8;
            _this.addChild(icon);
        } //add gems
        var display = new PIXI.Text("00", {
            font: "52px pixelmono",
            fill: "white"
        });
        display.y = 52;
        display.x = 8;
        _this.display = display;
        _this.addChild(display);
        var total = new PIXI.Text("/" + (_this.rules.max < 10 ? "0" + _this.rules.max : _this.rules.max), {
            font: "30px pixelmono",
            fill: "white"
        });
        total.x = display.width + 16;
        total.y = 52;
        _this.addChild(total);
        g.all.addChild(_this);
        return _this;
    }
    return Counter;
}(PIXI.Sprite));
var default_1 = /** @class */ (function () {
    function default_1() {
        var _this = this;
        this.over = false;
        this.exit = false;
        this.locations = [
            { x: g.maze.snake.x, y: g.maze.snake.y },
            { x: g.maze.snake.x, y: g.maze.snake.y },
            { x: g.maze.snake.x, y: g.maze.snake.y }
        ];
        this.sprites = [];
        this.gems = [];
        this.sprites.push(new Segment("head"));
        this.sprites.push(new Segment("body"));
        this.sprites.push(new Segment("tail"));
        g.stage.y += 320 - this.sprites[0].worldTransform.ty;
        g.stage.x += 416 - this.sprites[0].worldTransform.tx;
        this.counter = new Counter();
        if (g.maze.mode === "normal") {
            this.fruit();
            this.fruit();
            this.fruit();
        }
        else {
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
        ;
        this.direction = g.maze.snake.direction;
        this.predirection = this.direction;
        var a = this;
        key_press_1["default"].waitDown([65, 37], function () {
            //Left
        }, true);
        key_press_1["default"].waitDown([68, 39], function () {
            //Right
        }, true);
        key_press_1["default"].waitDown([87, 38], function () {
            //Up
            if (_this.direction == "r" || _this.direction == "l" && _this.predirection != "u") {
                _this.predirection = "u";
            }
            ;
        }, true);
        key_press_1["default"].waitDown([83, 40], function () {
            //Down
        }, true);
    }
    ;
    default_1.prototype.shoop = function () {
        this.doop();
        key_press_1["default"].mostRecentKey = null;
    };
    default_1.prototype.doop = function () {
        for (var i = 0; i <= key_press_1["default"].moveKeys.length; i++) {
            var x = void 0;
            if (i === key_press_1["default"].moveKeys.length) {
                x = key_press_1["default"].mostRecentKey;
            }
            else {
                x = key_press_1["default"].moveKeys[i];
            }
            switch (x) {
                case 65:
                case 37:
                    if (this.direction == "u" || this.direction == "d" && this.predirection != "l") {
                        this.predirection = "l";
                        return;
                    }
                    ;
                    break;
                case 68:
                case 39:
                    if (this.direction == "u" || this.direction == "d" && this.predirection != "r") {
                        this.predirection = "r";
                        return;
                    }
                    ;
                    break;
                case 83:
                case 40:
                    if (this.direction == "r" || this.direction == "l" && this.predirection != "d") {
                        this.predirection = "d";
                        return;
                    }
                    ;
                    break;
                case 87:
                case 38:
                    if (this.direction == "r" || this.direction == "l" && this.predirection != "u") {
                        this.predirection = "u";
                        return;
                    }
                    ;
                    break;
                default:
                //throw "what the heck is happening how did we get here why am i failing at programming :((";
            }
        }
    };
    default_1.prototype.move = function (x, y) {
        for (var i = this.locations.length - 1; i > 0; i--) {
            this.locations[i] = Object.assign({}, this.locations[i - 1]);
        }
        this.locations[0].x += x;
        this.locations[0].y -= y;
        this.sprites[0].rotation = (y / 2 + x / 2 + (x != 0 ? 0.5 : 0) + .5) * Math.PI;
        for (var i = 0; i < this.sprites.length; i++) {
            //Define location variables
            var p = this.locations[i - 1]; //previous
            var c = this.locations[i]; //current
            var a = this.locations[i + 1]; //after
            //Position segments based on location
            this.sprites[i].x = c.x * 32 + 16;
            this.sprites[i].y = c.y * 32 + 16;
            //Calculate location based on the direction of motion
            if (i !== 0) {
                if (this.sprites[i].segmentType === "tail") {
                    var ct = 1;
                    while (c.x === p.x && c.y === p.y) {
                        ct++;
                        p = this.locations[i - ct];
                    }
                }
                var x_1 = (p.x - c.x);
                var y_1 = (c.y - p.y);
                this.sprites[i].rotation = (y_1 / 2 + x_1 / 2 + (x_1 != 0 ? 0.5 : 0) + .5) * Math.PI;
            }
            //An array of right turn coordinates
            var right = [
                [
                    [0, 1],
                    [1, 0]
                ],
                [
                    [1, 0],
                    [0, -1]
                ],
                [
                    [0, -1],
                    [-1, 0]
                ],
                [
                    [-1, 0],
                    [0, 1]
                ]
            ];
            //If a body segment...
            if (this.sprites[i].segmentType === "body") {
                this.sprites[i].visible = !(this.locations[this.locations.length - 1].x === this.locations[i].x && this.locations[this.locations.length - 1].y === this.locations[i].y);
                //Test for corners, if not a corner, become a body segment
                if (c.x === p.x && p.x === a.x || c.y === p.y && p.y === a.y) {
                    this.sprites[i].setTexture(PIXI.loader.resources["assets/snake-body.png"].texture);
                }
                else {
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
                        this.sprites[i].rotation += Math.PI * .5;
                    }
                    ;
                    //Since this is a corner apply the corner texture
                    this.sprites[i].setTexture(PIXI.loader.resources["assets/snake-corner.png"].texture);
                }
                ;
            }
            ;
        }
        ;
        this.collide();
    };
    default_1.prototype.eat = function () {
        var a = this;
        var piece = new Segment("body");
        this.sprites.splice(this.sprites.length - 1, 0, piece);
        this.locations.splice(this.locations.length - 1, 0, this.locations[this.locations.length - 2]);
        piece.x = (this.locations.length - 1).x * 32;
        piece.y = (this.locations.length - 1).y * 32;
        this.layer();
        this.counter.rules.current++;
        this.counter.display.text = (this.counter.rules.current < 10 ? "0" + this.counter.rules.current : this.counter.rules.current);
        if (this.counter.rules.current == this.counter.rules.max) {
            var len = a.gems.length;
            for (var i = len - 1; i >= 0; i--) {
                g.stage.removeChild(a.gems[i]);
                a.gems.splice(i, 1);
            }
            function check() {
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
                    a.exitSprite.scale.x = 1 / 6;
                    a.exitSprite.scale.y = 1 / 6;
                    a.exitSprite.coord = spawn;
                    a.exitSprite.zIndex = 1;
                    g.stage.addChild(a.exitSprite);
                }
                else {
                    check();
                }
            }
            check();
        }
    };
    default_1.prototype.layer = function () {
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].zIndex = 1;
        }
        g.stage.updateLayersOrder();
    };
    default_1.prototype.collide = function () {
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
        if (g.maze.data[this.locations[0].y] != undefined && typeof g.maze.data[this.locations[0].y][this.locations[0].x] === "object") {
            var portal_1 = g.maze.data[this.locations[0].y][this.locations[0].x];
            var target_1;
            g.maze.data.forEach(function (val) {
                val.forEach(function (m) {
                    if (m.id === portal_1.target) {
                        target_1 = m;
                    }
                });
            });
            this.locations[0].x = target_1.x;
            this.locations[0].y = target_1.y;
            this.predirection = target_1.direction;
            this.checkMove();
            return;
        }
        if (death && !this.over) {
            //TODO = HANDLE DEATH OF THE SNAKE WITH A DEATH SCREEN
            collide = true;
            g.level.end("death");
            this.over = true;
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
            if (this.locations[0].x === this.exitSprite.coord.x && this.locations[0].y === this.exitSprite.coord.y && !this.over) {
                //TODO = WIN SCREEN
                collide = true;
                g.level.end("victory");
                this.over = true;
            }
        }
        return collide;
    };
    default_1.prototype.checkMove = function () {
        this.direction = this.predirection;
        switch (this.direction) {
            case "l":
                this.move(-1, 0);
                break;
            case "r":
                this.move(1, 0);
                break;
            case 'u':
                this.move(0, 1);
                break;
            case 'd':
                this.move(0, -1);
        }
    };
    default_1.prototype.fruit = function () {
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
            })
                && g.maze.data[spawn.y][spawn.x] === 2;
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
            }
            else {
                check();
            }
        }
        check();
    };
    return default_1;
}());
exports["default"] = default_1;


/***/ }),

/***/ "./snakemaze/src/components/button.ts":
/*!********************************************!*\
  !*** ./snakemaze/src/components/button.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function default_1(sprite, x, y, func) {
    sprite.buttonMode = true;
    sprite.interactive = true;
    sprite.x = x;
    sprite.y = y;
    sprite.on('click', func);
}
exports["default"] = default_1;


/***/ }),

/***/ "./snakemaze/src/components/menu.ts":
/*!******************************************!*\
  !*** ./snakemaze/src/components/menu.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var MenuManager = /** @class */ (function () {
    function MenuManager() {
        this.menus = [];
    }
    MenuManager.prototype.show = function (menuName) {
        this.hide();
        this.menus.forEach(function (val) {
            if (val.name === menuName) {
                val.visible = true;
                g.soundManager.visible = val.sound;
            }
        });
        console.log("render");
        g.renderer.render(g.all);
    };
    MenuManager.prototype.hide = function () {
        this.menus.forEach(function (val) {
            val.visible = false;
        });
    };
    MenuManager.prototype.push = function (menu) {
        this.menus.push(menu);
    };
    return MenuManager;
}());
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(name, sound) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.sound = sound;
        g.manager.push(_this);
        g.all.addChild(_this);
        return _this;
    }
    return Menu;
}(PIXI.Container));
var shapes_1 = __webpack_require__(/*! ../drawing/shapes */ "./snakemaze/src/drawing/shapes.ts");
var button_1 = __webpack_require__(/*! ./button */ "./snakemaze/src/components/button.ts");
var SoundManager = /** @class */ (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super.call(this) || this;
        _this.x = 832 - 128 - 16;
        _this.y = 640 - 64 - 16;
        _this.zOrder = -4;
        return _this;
    }
    return SoundManager;
}(PIXI.Container));
var SoundMenu = /** @class */ (function (_super) {
    __extends(SoundMenu, _super);
    function SoundMenu(x, y, textureOn, textureOff) {
        var _this = _super.call(this, textureOn) || this;
        _this.enabled = true;
        button_1["default"](_this, x, y, function () {
            if (!_this.enabled) {
                _this.setTexture(textureOn);
            }
            else {
                _this.setTexture(textureOff);
            }
            _this.enabled = !_this.enabled;
        });
        return _this;
    }
    return SoundMenu;
}(PIXI.Sprite));
function default_1() {
    g.manager = new MenuManager();
    // -- HANDLE MUSIC --
    g.soundManager = new SoundManager();
    g.soundManager.addChild(new SoundMenu(-4, 0, PIXI.loader.resources["assets/music.png"].texture, PIXI.loader.resources["assets/nomusic.png"].texture));
    g.soundManager.addChild(new SoundMenu(64, 0, PIXI.loader.resources["assets/sound.png"].texture, PIXI.loader.resources["assets/nosound.png"].texture));
    g.all.addChild(g.soundManager);
    // -- START SCREEN --
    var startScreen = new Menu("start", true);
    var background = new PIXI.Sprite(PIXI.loader.resources["assets/titlescreen.png"].texture);
    startScreen.addChild(background);
    var start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture);
    startScreen.addChild(start);
    button_1["default"](start, 64 * 4 + 32, 64 * 6, function () {
        g.manager.show("level");
    });
    // -- LEVEL SELECT --
    var levelSelect = new Menu("level", true);
    var _loop_1 = function (i) {
        var _loop_2 = function (j) {
            var lev = new PIXI.Sprite(PIXI.loader.resources["assets/background-incomplete.png"].texture);
            levelSelect.addChild(lev);
            button_1["default"](lev, i * 128 + 128, j * 128 + 128, function () {
                g.level = new g.newLevel(i + j * 5);
            });
            text = new PIXI.Text(i + j * 5, {
                font: "48px Pixel",
                fill: "white"
            });
            text.anchor.x = 0.5;
            text.x = 32;
            text.y = 8;
            lev.addChild(text);
        };
        for (var j = 0; j < 2; j++) {
            _loop_2(j);
        }
    };
    var text;
    for (var i = 0; i < 5; i++) {
        _loop_1(i);
    }
    // -- QUIT BUTTON --
    var exit = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    levelSelect.addChild(exit);
    button_1["default"](exit, 0, 0, function () {
        g.manager.show("start");
    });
    // -- MENU TO SHOW ON DEATH --
    //TODO
    var exit2 = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    button_1["default"](exit2, 0, 0, function () {
        g.manager.show("start");
        g.level.kill();
    });
    g.manager.loadReplay = function () {
        //Set callback of below hamburgers
    };
    var deathMenu = new Menu("death", false);
    var deathBase = new PIXI.Sprite(shapes_1["default"].rectangle(64 * 6, 64 * 4, "rgba(0, 0, 0,0.7)"));
    deathBase.x = 832 / 2 - deathBase.width / 2;
    deathBase.y = 640 / 2 - deathBase.height / 2;
    deathMenu.zOrder = -4;
    var youDied = new PIXI.Text("You died!", {
        font: "52px Pixel",
        fill: "white"
    });
    youDied.anchor.x = 0.5;
    youDied.x = deathBase.width / 2;
    youDied.y = 32;
    deathBase.addChild(youDied);
    deathMenu.addChild(deathBase);
    deathMenu.addChild(exit2);
    var victoryMenu = new Menu("victory", false);
    var victoryBase = new PIXI.Sprite(shapes_1["default"].rectangle(64 * 6, 64 * 4, "rgba(255, 255, 255,0.7)"));
    victoryBase.x = 832 / 2 - victoryBase.width / 2;
    victoryBase.y = 640 / 2 - victoryBase.height / 2;
    victoryMenu.zOrder = -4;
    victoryMenu.addChild(victoryBase);
    //victoryMenu.addChild(exit2);
}
exports["default"] = default_1;


/***/ }),

/***/ "./snakemaze/src/components/pause.ts":
/*!*******************************************!*\
  !*** ./snakemaze/src/components/pause.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var shapes_1 = __webpack_require__(/*! ../drawing/shapes */ "./snakemaze/src/drawing/shapes.ts");
var key_press_1 = __webpack_require__(/*! ../utilities/key-press */ "./snakemaze/src/utilities/key-press.ts");
var button_1 = __webpack_require__(/*! ./button */ "./snakemaze/src/components/button.ts");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super.call(this, shapes_1["default"].rectangle(832, 640, "rgba(44, 62, 80,0.7)")) || this;
        var a = _this;
        _this.visible = false;
        var text = new PIXI.Text("Game paused", {
            font: "52px Pixel",
            fill: "white"
        });
        text.anchor.x = 0.5;
        text.x = 416;
        text.y = 200;
        _this.addChild(text);
        _this.zOrder = -3;
        _this.allow = true;
        _this.veto = false;
        g.all.addChild(_this);
        var abort = new PIXI.Sprite(shapes_1["default"].rectangle(64 * 5, 64 * 2, "#000"));
        button_1["default"](abort, 4 * 64, 5 * 64, function () {
            g.level.kill();
            _this.veto = true;
        });
        _this.addChild(abort);
        return _this;
    }
    default_1.prototype.handle = function (renderloop, gameloop, background) {
        var a = this;
        function wait() {
            if (!a.veto) {
                gameloop.start();
                renderloop.then = Date.now();
                renderloop.start();
                a.visible = false;
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
        key_press_1["default"].check(80, function () {
            if (a.allow) {
                a.visible = true;
                g.soundManager.visible = true;
                //background.zIndex = -2;
                a.zIndex = -3;
                g.all.updateLayersOrder();
                a.allow = false;
                console.log("render");
                g.renderer.render(g.all);
                gameloop.stop();
                renderloop.stop();
                key_press_1["default"].waitUp(80, function () {
                    key_press_1["default"].waitDown(80, wait);
                    key_press_1["default"].waitUp(80, allow);
                });
            }
        });
    };
    ;
    return default_1;
}(PIXI.Sprite));
exports["default"] = default_1;
;


/***/ }),

/***/ "./snakemaze/src/drawing/shapes.ts":
/*!*****************************************!*\
  !*** ./snakemaze/src/drawing/shapes.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports["default"] = new function () {
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

/***/ "./snakemaze/src/index.ts":
/*!********************************!*\
  !*** ./snakemaze/src/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//glpnasfasfasfsafsa
//Initialize a global value g
exports.__esModule = true;
//Utilities
var key_press_1 = __webpack_require__(/*! ./utilities/key-press */ "./snakemaze/src/utilities/key-press.ts");
__webpack_require__(/*! ./utilities/equals */ "./snakemaze/src/utilities/equals.ts");
var fps_1 = __webpack_require__(/*! ./utilities/fps */ "./snakemaze/src/utilities/fps.ts");
var gametick_1 = __webpack_require__(/*! ./utilities/gametick */ "./snakemaze/src/utilities/gametick.ts");
//Level
var levels_1 = __webpack_require__(/*! ./level/levels */ "./snakemaze/src/level/levels.ts");
//Components
var menu_1 = __webpack_require__(/*! ./components/menu */ "./snakemaze/src/components/menu.ts");
var pause_1 = __webpack_require__(/*! ./components/pause */ "./snakemaze/src/components/pause.ts");
var buildSnake_1 = __webpack_require__(/*! ./components/buildSnake */ "./snakemaze/src/components/buildSnake.ts");
//Tile rendering
var map_1 = __webpack_require__(/*! ./tile-rendering/map */ "./snakemaze/src/tile-rendering/map.ts");
Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};
key_press_1["default"].listen();
window.g = {};
g.renderer = PIXI.autoDetectRenderer(832, 640);
g.renderer.backgroundColor = 0x444444;
g.all = new PIXI.Container();
document.body.appendChild(g.renderer.view);
PIXI.loader.add("assets/sound.png").add("assets/nosound.png").add("assets/background-incomplete.png").add("assets/background-complete.png").add("assets/snake-head.png").add("assets/rainbow.json").add("assets/snake-body.png").add("assets/snake-corner.png").add("assets/snake-tail.png").add("assets/grass.png").add("assets/flowers-1.png").add("assets/flowers-2.png").add("assets/rock.png").add("assets/gem-1.png").add("assets/gem-2.png").add("assets/gem-3.png").add("assets/level-1.png").add("assets/titlescreen.png").add("assets/start.png").add("assets/back.png").add("assets/music.png").add("assets/nomusic.png").load(fonts);
function fonts() {
    WebFont.load({
        custom: {
            families: ['Pixel', 'pixelmono'],
            urls: ["/stylesheet.css"]
        },
        active: function (e) {
            // now start setting up your PixiJS (or canvas) stuff!
            setup();
        }
    });
}
function setup() {
    //Build guidelines
    var textures = [
        PIXI.loader.resources["assets/grass.png"].texture,
        PIXI.loader.resources["assets/flowers-1.png"].texture,
        PIXI.loader.resources["assets/flowers-2.png"].texture,
        PIXI.loader.resources["assets/rock.png"].texture
    ];
    //Button is a function that creates an interactive sprite at a certain position, and provide a callback
    menu_1["default"]();
    g.manager.show("start"); //set to level for debug
    g.all.updateLayersOrder = function () {
        g.all.children.sort(function (a, b) {
            a.zOrder = a.zOrder || 0;
            b.zOrder = b.zOrder || 0;
            return b.zOrder - a.zOrder;
        });
    };
    g.newLevel = function (num) {
        g.manager.loadReplay(num);
        if (levels_1["default"][num] == undefined)
            return;
        //maze
        g.maze = levels_1["default"][num];
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
        function fixx(px) {
            var x = levels_1["default"][num].data[0].length * 32;
            if (px > 0 && px < -x + 832) {
                calcx = false;
                return (-x + 832) / 2;
            }
            if (px > 0) {
                return 0;
            }
            if (px < -x + 832) {
                return -x + 832;
            }
            return px;
        }
        function fixy(py) {
            var y = levels_1["default"][num].data.length * 32;
            if (py > 0 && py < -y + 640) {
                calcy = false;
                return (-y + 640) / 2;
            }
            if (py > 0) {
                return 0;
            }
            if (py < -y + 640) {
                return -y + 640;
            }
            return py;
        }
        function camera(diff) {
            if (calcy) {
                g.stage.y += diff * 100 * ((320 - snake.sprites[0].worldTransform.ty) / (40 - (+(Math.abs(320 - snake.sprites[0].worldTransform.ty) > 640)) * 39));
            }
            if (calcx) {
                g.stage.x += diff * 100 * ((416 - snake.sprites[0].worldTransform.tx) / (40 - (+(Math.abs(416 - snake.sprites[0].worldTransform.tx) > 832)) * 39));
            }
            g.stage.y = fixy(g.stage.y);
            g.stage.x = fixx(g.stage.x);
        }
        var calcx = true;
        var calcy = true;
        //give kill function
        this.kill = function () {
            loop.stop();
            gameTick.stop();
            g.level.endLoop.stop();
            g.all.removeChild(g.stage);
            g.all.removeChild(snake.counter);
            g.all.removeChild(pause.obj);
            g.manager.show("level");
        };
        this.end = function (condition) {
            //Either "victory" or "death"
            //Jam controls, explode snake
            loop.stop();
            gameTick.stop();
            //Create a new loop with no controls
            var n = 0;
            snake.counter.xvel = 0;
            g.level.endLoop = new fps_1["default"](function (frames, self, diff) {
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
                if (condition === "victory") {
                    if (snake.sprites.length !== n - 1) {
                        if (frames % 10 === 0) {
                            g.stage.removeChild(snake.sprites[n]);
                            snake.checkMove();
                            n++;
                        }
                    }
                    else {
                        g.manager.show("victory");
                    }
                }
                if (condition === "death") {
                    if (frames % 10 === 0) {
                        if (snake.sprites.length - 1 === n) {
                            snake.sprites[n].tint = 0x000;
                            g.manager.show("death");
                        }
                        else {
                            do {
                                snake.sprites[n].tint = 0x000;
                                n++;
                            } while (snake.locations[n].x === snake.locations[n + 1].x && snake.locations[n].y === snake.locations[n + 1].y);
                        }
                    }
                }
                if (snake.sprites.length <= n - 1 || !isNaN(snake.sprites[n].worldTransform.ty) && !isNaN(snake.sprites[n].worldTransform.tx)) {
                    camera(diff);
                }
                background.children.forEach(function (val) {
                    val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64;
                    val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64;
                });
                tiles.children.forEach(function (val) {
                    val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672);
                });
                g.renderer.render(g.all);
                console.log("render");
            });
        };
        //Create a pause menu
        var pause = new pause_1["default"]();
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
        map_1["default"](g.maze.data, tiles);
        g.stage.addChild(background);
        var snake = new buildSnake_1["default"]();
        snake.layer();
        g.all.updateLayersOrder();
        var start = 1;
        //Start by moving the snake to allow instantaneous snake positioning
        for (var i = 0; i < 2; i++) {
            switch (levels_1["default"][num].snake.direction) {
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
        var countdown = new PIXI.Text("3", {
            font: "52px Pixel",
            fill: "white"
        });
        g.stage.addChild(countdown);
        var gameTick = new gametick_1["default"](function (frames, self) {
            if (frames > 24) {
                //TODO CHECK LOCATION
                snake.shoop();
                snake.checkMove();
            }
            else {
                if (Math.ceil(3 - frames / 8) === 0) {
                    countdown.visible = false;
                }
                else {
                    countdown.setText(Math.ceil(3 - frames / 8));
                }
            }
        }, 130);
        g.stage.x = -(snake.sprites[0].x - 416);
        g.stage.y = -(snake.sprites[0].y - 320);
        //this render needs to be invisible
        //derive world transform some other way
        g.stage.x = fixx(g.stage.x + 32);
        g.stage.y = fixy(g.stage.y + 32);
        g.stage.x = fixx(g.stage.x - 16);
        g.stage.y = fixy(g.stage.y + 16);
        g.renderer.render(g.all);
        var loop = new fps_1["default"](function (frames, self, diff) {
            console.log(diff);
            countdown.x = -g.stage.x + 416;
            countdown.y = -g.stage.y + 320;
            camera(diff);
            //
            background.children.forEach(function (val) {
                val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64;
                val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64;
            });
            tiles.children.forEach(function (val) {
                val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672);
            });
            g.renderer.render(g.all);
            pause.handle(self, gameTick, background);
            console.log("render");
        });
        return this;
    };
}


/***/ }),

/***/ "./snakemaze/src/level/levels.ts":
/*!***************************************!*\
  !*** ./snakemaze/src/level/levels.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports["default"] = [{
        "mode": "normal",
        "snake": {
            "x": 16,
            "y": 2,
            "direction": "r"
        },
        "data": [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    }, {
        "mode": "normal",
        "snake": {
            "x": 14,
            "y": 6,
            "direction": "u"
        },
        "data": [
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1],
            [1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
            [1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1],
            [1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1],
            [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
            [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
            [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
        ]
    }, {
        "mode": "normal",
        "snake": {
            "x": 12,
            "y": 76,
            "direction": "l"
        },
        "data": [
            [1, {
                    "x": 1,
                    "y": 0,
                    "id": "2",
                    "target": "1",
                    "direction": "u"
                }, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, {
                    "x": 10,
                    "y": 74,
                    "id": "1",
                    "target": "2",
                    "direction": "d"
                }, 1]
        ]
    }, {
        "mode": "crash",
        "snake": {
            "x": 2,
            "y": 16,
            "direction": "u"
        },
        "end": {
            "x": 2,
            "y": 18
        },
        "data": [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        "fruit": []
    }, {
        "mode": "normal",
        "snake": {
            "x": 2,
            "y": 16,
            "direction": "r"
        },
        "data": [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }, {
        "mode": "normal",
        "snake": {
            "x": 1,
            "y": 7,
            "direction": "r"
        },
        "end": {
            "x": -15,
            "y": -2
        },
        "data": [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
            [1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    {
        "mode": "normal",
        "snake": {
            "x": 1,
            "y": 2,
            "direction": "r"
        },
        "end": {
            "x": -14,
            "y": -10
        },
        "data": [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    },
    {
        "mode": "normal",
        "snake": {
            "x": 11,
            "y": 14,
            "direction": "r"
        },
        "end": {
            "x": -14,
            "y": 12
        },
        "data": [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
        ]
    },
    {
        "mode": "normal",
        "snake": {
            "x": 1,
            "y": 1,
            "direction": "r"
        },
        "end": {
            "x": -6,
            "y": -3
        },
        "data": [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, {
                    "x": 18,
                    "y": 2,
                    "id": "3",
                    "target": "2",
                    "direction": "r"
                }, 0, 0, 0, 0, 0, 0, 0, {
                    "x": 26,
                    "y": 2,
                    "id": "2",
                    "target": "3",
                    "direction": "l"
                }, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, {
                    "x": 6,
                    "y": 6,
                    "id": "1",
                    "target": "2",
                    "direction": "d"
                }, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        "fruit": []
    }
];


/***/ }),

/***/ "./snakemaze/src/tile-rendering/dirt.ts":
/*!**********************************************!*\
  !*** ./snakemaze/src/tile-rendering/dirt.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var shapes_1 = __webpack_require__(/*! ../drawing/shapes */ "./snakemaze/src/drawing/shapes.ts");
var lighten_1 = __webpack_require__(/*! ./lighten */ "./snakemaze/src/tile-rendering/lighten.ts");
function default_1(x) {
    var canvas = shapes_1["default"].canvas(32, 32);
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
            }
            else {
                if (x[bounds[Math.floor(j)][Math.floor(i)]] === 0) {
                    //Grass
                    canvas.ctx.fillStyle = "#" + (lighten_1["default"]("006600", Math.random() * -5));
                }
                else {
                    //Not Grass
                    canvas.ctx.fillStyle = "#" + (lighten_1["default"]("006600", Math.random() * 10 + 5));
                }
            }
            canvas.ctx.fillRect(i * 5.333, j * 5.333, 6, 6);
        }
    }
    return PIXI.Texture.fromCanvas(canvas.canvas);
}
exports["default"] = default_1;


/***/ }),

/***/ "./snakemaze/src/tile-rendering/lighten.ts":
/*!*************************************************!*\
  !*** ./snakemaze/src/tile-rendering/lighten.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function default_1(color, percent) {
    var num = parseInt(color, 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, B = (num >> 8 & 0x00FF) + amt, G = (num & 0x0000FF) + amt;
    return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}
exports["default"] = default_1;
;


/***/ }),

/***/ "./snakemaze/src/tile-rendering/map.ts":
/*!*********************************************!*\
  !*** ./snakemaze/src/tile-rendering/map.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var shapes_1 = __webpack_require__(/*! ../drawing/shapes */ "./snakemaze/src/drawing/shapes.ts");
var dirt_1 = __webpack_require__(/*! ./dirt */ "./snakemaze/src/tile-rendering/dirt.ts");
function default_1(arr, tiles) {
    //Map size is 20 blocks tall and 32 wide
    //0 is grass 1 is dirt
    function getName(x, y) {
        var l = arr[y][x - 1] === 1, t = arr[y - 1] && arr[y - 1][x] === 1, r = arr[y][x + 1] === 1, b = arr[y + 1] && arr[y + 1][x] === 1, tl = arr[y - 1] && arr[y - 1][x - 1] === 1, tr = arr[y - 1] && arr[y - 1][x + 1] === 1, br = arr[y + 1] && arr[y + 1][x + 1] === 1, bl = arr[y + 1] && arr[y + 1][x - 1] === 1;
        return [
            (l && t ? +tl : 0), +t || 0, (r && t ? +tr : 0),
            +l, +r,
            (l && b ? +bl : 0), +b || 0, (r && b ? +br : 0)
        ];
    }
    var debug = [];
    for (var i = 0; i < arr.length; i++) {
        arr[i].forEach(function (cel, j) {
            var cell = arr[i][j];
            if (typeof cell === "object") {
                cell = new PIXI.Sprite(shapes_1["default"].rectangle(32, 32, "#fff"));
                cell.x = j * 32;
                cell.y = i * 32;
                tiles.addChild(cell);
            }
            else {
                switch (cell) {
                    case " ":
                    case 0:
                    case 2:
                        break;
                    case 1:
                        //PIXI.loader.resources["assets/tile.png"].texture
                        cell = new PIXI.Sprite(dirt_1["default"](getName(j, i)));
                        cell.x = j * 32;
                        cell.y = i * 32;
                        tiles.addChild(cell);
                        break;
                }
            }
        });
    }
}
exports["default"] = default_1;
;


/***/ }),

/***/ "./snakemaze/src/utilities/equals.ts":
/*!*******************************************!*\
  !*** ./snakemaze/src/utilities/equals.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;
    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });


/***/ }),

/***/ "./snakemaze/src/utilities/fps.ts":
/*!****************************************!*\
  !*** ./snakemaze/src/utilities/fps.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var timer_ts_1 = __webpack_require__(/*! ./timer.ts */ "./snakemaze/src/utilities/timer.ts");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(cb) {
        var _this = _super.call(this, cb) || this;
        _this.draw = function () {
            if (_this.going) {
                requestAnimationFrame(_this.draw);
                _this.ct++;
                _this.diff = (Date.now() - _this.then) / 1000;
                _this.then = Date.now();
                _this.cb(_this.ct, _this, _this.diff);
            }
        };
        _this.then = Date.now();
        _this.diff;
        requestAnimationFrame(_this.draw);
        return _this;
    }
    default_1.prototype.start = function () {
        this.going = true;
        requestAnimationFrame(this.draw);
    };
    return default_1;
}(timer_ts_1["default"]));
exports["default"] = default_1;


/***/ }),

/***/ "./snakemaze/src/utilities/gametick.ts":
/*!*********************************************!*\
  !*** ./snakemaze/src/utilities/gametick.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var timer_ts_1 = __webpack_require__(/*! ./timer.ts */ "./snakemaze/src/utilities/timer.ts");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(cb, delay) {
        var _this = _super.call(this, cb) || this;
        _this.draw = function () {
            if (_this.going) {
                setTimeout(_this.draw, _this.delay);
                _this.ct++;
                _this.cb(_this.ct, _this);
            }
        };
        _this.delay = delay;
        _this.draw();
        return _this;
    }
    default_1.prototype.start = function () {
        this.going = true;
        setTimeout(this.draw, this.delay);
    };
    return default_1;
}(timer_ts_1["default"]));
exports["default"] = default_1;


/***/ }),

/***/ "./snakemaze/src/utilities/key-press.ts":
/*!**********************************************!*\
  !*** ./snakemaze/src/utilities/key-press.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports["default"] = new /** @class */ (function () {
    function class_1() {
        this.listen = function () {
            var _this = this;
            var a = this;
            var addMove = function (key) {
                if (_this.moveKeys.indexOf(key) === -1) {
                    _this.moveKeys.unshift(key);
                }
            };
            var reMove = function (key) {
                if (_this.moveKeys.indexOf(key) !== -1) {
                    _this.moveKeys.splice(_this.moveKeys.indexOf(key), 1);
                }
            };
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
                            if (!tether.perma)
                                a.tethers.splice(index, 1);
                        }
                    }
                });
                switch (e) {
                    case 65:
                    case 37:
                    case 68:
                    case 39:
                    case 87:
                    case 38:
                    case 83:
                    case 40:
                        _this.mostRecentKey = e;
                        addMove(e);
                        break;
                }
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
                            if (!tether.perma)
                                a.tethers.splice(index, 1);
                        }
                    }
                });
                switch (e) {
                    case 65:
                    case 37:
                    case 68:
                    case 39:
                    case 87:
                    case 38:
                    case 83:
                    case 40:
                        reMove(e);
                        break;
                }
            };
        };
        var a = this;
        this.map = [];
        this.tethers = [];
        this.moveKeys = [];
        this.mostRecentKey;
    }
    class_1.prototype.check = function (key, callback, not) {
        var a = this;
        if (typeof key != "object") {
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
    ;
    class_1.prototype.waitUp = function (key, func, perma) {
        var a = this;
        if (typeof key != "object") {
            key = [key];
        }
        if (perma === undefined) {
            perma = false;
        }
        key.forEach(function (keys) {
            a.tethers.push({
                "key": keys,
                "func": func,
                "type": "up",
                "perma": perma
            });
        });
    };
    ;
    class_1.prototype.waitDown = function (key, func, perma) {
        var a = this;
        if (typeof key != "object") {
            key = [key];
        }
        if (perma === undefined) {
            perma = false;
        }
        key.forEach(function (keys) {
            a.tethers.push({
                "key": keys,
                "func": func,
                "type": "down",
                "perma": perma
            });
        });
    };
    ;
    return class_1;
}())();


/***/ }),

/***/ "./snakemaze/src/utilities/timer.ts":
/*!******************************************!*\
  !*** ./snakemaze/src/utilities/timer.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var default_1 = /** @class */ (function () {
    function default_1(cb) {
        this.going = true;
        this.ct = 0;
        this.cb = cb;
    }
    //start
    default_1.prototype.resume = function () {
        this.start();
    };
    default_1.prototype.toggle = function () {
        this.going = !this.going;
    };
    default_1.prototype.stop = function () {
        this.going = false;
    };
    default_1.prototype.pause = function () {
        this.stop();
    };
    default_1.prototype.restart = function () {
        this.ct = 0;
    };
    return default_1;
}());
exports["default"] = default_1;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map