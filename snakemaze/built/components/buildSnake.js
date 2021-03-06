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
Object.defineProperty(exports, "__esModule", { value: true });
var shapes_js_1 = require("../drawing/shapes.js");
var segment = /** @class */ (function (_super) {
    __extends(segment, _super);
    function segment(type) {
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
    return segment;
}(PIXI.Sprite));
var buildSnake = /** @class */ (function () {
    function buildSnake() {
        this.exit = false;
        this.locations = [
            { x: g.maze.snake.x, y: g.maze.snake.y },
            { x: g.maze.snake.x, y: g.maze.snake.y },
            { x: g.maze.snake.x, y: g.maze.snake.y }
        ];
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
        this.counter.addChild(new PIXI.Sprite(shapes_js_1.default.rectangle(128, 96, "rgba(44, 62, 80,0.7)")));
        this.counter.rules = {
            "current": 0,
            "max": 25
        };
        //Generate icons for the counter
        for (var i = 0; i < 3; i++) {
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
        this.direction = g.maze.snake.direction;
    }
    buildSnake.prototype.move = function (x, y, portal) {
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
                    //Since this is a corner apply the corner texture
                    this.sprites[i].setTexture(PIXI.loader.resources["assets/snake-corner.png"].texture);
                }
            }
        }
        this.collide();
    };
    buildSnake.prototype.eat = function () {
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
                    console.log(spawn);
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
    buildSnake.prototype.layer = function () {
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].zIndex = 1;
        }
        g.stage.updateLayersOrder();
    };
    buildSnake.prototype.collide = function () {
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
            console.log(target_1);
            this.locations[0].x = target_1.x;
            this.locations[0].y = target_1.y;
            this.direction = target_1.direction;
            switch (target_1.direction) {
                case "left":
                    this.move(-1, 0);
                    ;
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
            g.level.end("death");
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
                g.level.end("victory");
            }
        }
        return collide;
    };
    buildSnake.prototype.fruit = function () {
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
    return buildSnake;
}());
exports.default = buildSnake;
