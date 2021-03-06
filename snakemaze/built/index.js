"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Utilities
var key_press_js_1 = require("./utilities/key-press.js");
require("./utilities/equals.js");
var fps_js_1 = require("./utilities/fps.js");
//Level
var levels_js_1 = require("./level/levels.js");
//Components
var menu_js_1 = require("./components/menu.js");
var pause_js_1 = require("./components/pause.js");
var buildSnake_js_1 = require("./components/buildSnake.js");
//Tile rendering
var map_js_1 = require("./tile-rendering/map.js");
Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};
key_press_js_1.default.listen();
g.renderer = PIXI.autoDetectRenderer(832, 640);
g.renderer.backgroundColor = 0x444444;
g.all = new PIXI.Container();
document.body.appendChild(g.renderer.view);
PIXI.loader.add("assets/snake-head.png").add("assets/rainbow.json").add("assets/snake-body.png").add("assets/snake-corner.png").add("assets/snake-tail.png").add("assets/grass.png").add("assets/flowers-1.png").add("assets/flowers-2.png").add("assets/rock.png").add("assets/gem-1.png").add("assets/gem-2.png").add("assets/gem-3.png").add("assets/level-1.png").add("assets/titlescreen.png").add("assets/start.png").add("assets/back.png").add("assets/music.png").add("assets/nomusic.png").load(fonts);
console.log("breaaak");
function fonts() {
    WebFont.load({
        custom: {
            families: ['Pixel', 'pixelmono'],
            urls: ["/stylesheet.css"]
        },
        active: function (e) {
            console.log("font loaded!");
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
    menu_js_1.default();
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
        if (levels_js_1.default[num] == undefined)
            return;
        //maze
        g.maze = levels_js_1.default[num];
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
            //Create a new loop with no controls
            var n = 0;
            snake.counter.xvel = 0;
            g.level.endLoop = new fps_js_1.default(function (frames, self) {
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
                    }
                    else {
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
        var pause = new pause_js_1.default();
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
        map_js_1.default(g.maze.data, tiles);
        g.stage.addChild(background);
        var snake = new buildSnake_js_1.default();
        snake.layer();
        var direction = snake.direction;
        var predirection = snake.direction;
        g.all.updateLayersOrder();
        var start = 1;
        //Start by moving the snake to allow instantaneous snake positioning
        for (var i = 0; i < 2; i++) {
            switch (levels_js_1.default[num].snake.direction) {
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
        var loop = new fps_js_1.default(function (frames, self) {
            g.stage.y += (320 - snake.sprites[0].worldTransform.ty) / (40 - (+(Math.abs(320 - snake.sprites[0].worldTransform.ty) > 640)) * 39);
            g.stage.x += (416 - snake.sprites[0].worldTransform.tx) / (40 - (+(Math.abs(416 - snake.sprites[0].worldTransform.tx) > 832)) * 39);
            background.children.forEach(function (val) {
                val.y = (val.orig.y * 64 + g.stage.y).mod(640 + 64) - g.stage.y - 64;
                val.x = (val.orig.x * 64 + g.stage.x).mod(832 + 64) - g.stage.x - 64;
            });
            tiles.children.forEach(function (val) {
                val.visible = !(val.x + g.stage.x < -32 || val.x + g.stage.x > 864 || val.y + g.stage.y < -32 || val.y + g.stage.y > 672);
            });
            if (frames % 8 == 0 && frames > 180) {
                pause.handle(self, background);
                key_press_js_1.default.check([65, 37], function () {
                    //Left
                    if (direction == "u" || direction == "d" && predirection != "l") {
                        predirection = "l";
                    }
                });
                key_press_js_1.default.check([68, 39], function () {
                    //Right
                    if (direction == "u" || direction == "d" && predirection != "r") {
                        predirection = "r";
                    }
                });
                key_press_js_1.default.check([87, 38], function () {
                    //Up
                    if (direction == "r" || direction == "l" && predirection != "u") {
                        predirection = "u";
                    }
                });
                key_press_js_1.default.check([83, 40], function () {
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
            }
            else {
                if (Math.ceil(3 - frames / 60) === 0) {
                    countdown.visible = false;
                }
                else {
                    countdown.setText(Math.ceil(3 - frames / 60));
                }
            }
            g.renderer.render(g.all);
        });
        return this;
    };
}
