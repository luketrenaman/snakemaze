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
/******/ 	return __webpack_require__(__webpack_require__.s = "./mazemake/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./mazemake/src/drawing/shapes.ts":
/*!****************************************!*\
  !*** ./mazemake/src/drawing/shapes.ts ***!
  \****************************************/
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
}();


/***/ }),

/***/ "./mazemake/src/index.ts":
/*!*******************************!*\
  !*** ./mazemake/src/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var shapes_1 = __webpack_require__(/*! ./drawing/shapes */ "./mazemake/src/drawing/shapes.ts");
var stage = new PIXI.Container();
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(832, 640, null, true);
renderer.backgroundColor = 0xcccccc;
renderer.interactive = true;
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
var text = document.createElement("textarea");
document.body.appendChild(text);
var start = { "x": 0, "y": 0 };
var prev = { "x": 0, "y": 0 };
var mouse = false;
// create a new Sprite using the texture
Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};
//PIXI.loader.resources
PIXI.loader
    .add("assets/drag.png")
    .add("assets/eraser.png")
    .add("assets/pencil.png")
    .add("assets/download.png")
    .add("assets/snake.png")
    .add("assets/fill.png")
    .add("assets/end.png")
    .add("assets/portal.png")
    .load(setup);
function setup() {
    function floodFill(x, y, arr) {
        if (arr[y] === undefined)
            return;
        if (arr[y][x] === undefined)
            return;
        if (alreadyFilled(x, y, arr))
            return;
        ff(x, y, arr);
        floodFill(x, y - 1, arr);
        floodFill(x + 1, y, arr);
        floodFill(x, y + 1, arr);
        floodFill(x - 1, y, arr);
    }
    function ff(x, y, arr) {
        arr[y][x] = 2;
    }
    function alreadyFilled(x, y, arr) {
        console.log(arr[y][x]);
        return arr[y][x] === 2 || arr[y][x] === 1 || typeof arr[y][x] === "object";
    }
    var zoom = 2;
    var mode = "drag";
    var gridBlock = new PIXI.Container();
    var icons = new PIXI.Container();
    var drag = new PIXI.Sprite(PIXI.loader.resources["assets/drag.png"].texture);
    drag.interactive = true;
    drag.buttonMode = true;
    drag.width = 70;
    drag.height = 70;
    drag.on('pointerdown', function () {
        mode = "drag";
        console.log("mode set to " + mode);
    });
    icons.addChild(drag);
    var draw = new PIXI.Sprite(PIXI.loader.resources["assets/pencil.png"].texture);
    draw.interactive = true;
    draw.buttonMode = true;
    draw.x = 70;
    draw.width = 70;
    draw.height = 70;
    draw.on('pointerdown', function () {
        mode = "draw";
        console.log("mode set to " + mode);
    });
    icons.addChild(draw);
    var eraser = new PIXI.Sprite(PIXI.loader.resources["assets/eraser.png"].texture);
    eraser.interactive = true;
    eraser.buttonMode = true;
    eraser.x = 140;
    eraser.width = 70;
    eraser.height = 70;
    eraser.on('pointerdown', function () {
        mode = "erase";
        console.log("mode set to " + mode);
    });
    icons.addChild(eraser);
    var download = new PIXI.Sprite(PIXI.loader.resources["assets/download.png"].texture);
    download.interactive = true;
    download.buttonMode = true;
    download.x = 210;
    download.width = 70;
    download.height = 70;
    download.on('pointerdown', function () {
        var coords = [];
        var ty = undefined;
        var tx = undefined;
        var ly = undefined;
        var lx = undefined;
        maze.forEach(function (val) {
            coords.push({ "x": val.coord.x, "y": val.coord.y, "direction": val.direction, "type": val.type, "id": val.id, "target": val.target });
            if (val.type === "cell" || val.type === "portal") {
                if (val.coord.x < lx || lx === undefined) {
                    lx = val.coord.x;
                }
                if (val.coord.x > tx || tx === undefined) {
                    tx = val.coord.x;
                }
                if (val.coord.y < ly || ly === undefined) {
                    ly = val.coord.y;
                }
                if (val.coord.y > ty || ty === undefined) {
                    ty = val.coord.y;
                }
            }
        });
        console.log(ty, " ", tx, " ", ly, " ", lx);
        console.log(coords);
        var level = {};
        var map = [];
        for (var i = 0; i < (ty - ly + 1); i++) {
            map.push([]);
            for (var j = 0; j < (tx - lx + 1); j++) {
                map[i].push(0);
            }
        }
        coords.forEach(function (val) {
            switch (val.type) {
                case "cell":
                    map[val.y - ly][val.x - lx] = 1;
                    break;
                case "snake":
                    level.snake = {
                        "x": val.x - lx,
                        "y": val.y - ly,
                        "direction": val.direction
                    };
                    break;
                case "end":
                    level.end = {
                        "x": val.x - lx,
                        "y": val.y - ly
                    };
                    break;
                case "portal":
                    map[val.y - ly][val.x - lx] = {
                        "x": val.x - lx,
                        "y": val.y - ly,
                        "id": val.id,
                        "target": val.target,
                        "direction": val.direction
                    };
                    break;
            }
        });
        coords.forEach(function (val) {
            if (val.type === "fill") {
                floodFill(val.x - lx, val.y - ly, map);
            }
        });
        level.data = map;
        level.mode = prompt("Pick a mode for the level. Ex: 'normal', 'crash'.");
        console.log(JSON.stringify(level));
        text.innerHTML = JSON.stringify(level);
    });
    icons.addChild(download);
    var snake = new PIXI.Sprite(PIXI.loader.resources["assets/snake.png"].texture);
    snake.interactive = true;
    snake.buttonMode = true;
    snake.x = 280;
    snake.width = 70;
    snake.height = 70;
    snake.on('pointerdown', function () {
        mode = "snake";
        snakeMarker.direction = prompt("Direction?");
        console.log("mode set to " + mode);
    });
    icons.addChild(snake);
    var fill = new PIXI.Sprite(PIXI.loader.resources["assets/fill.png"].texture);
    fill.interactive = true;
    fill.buttonMode = true;
    fill.x = 350;
    fill.width = 70;
    fill.height = 70;
    fill.on('pointerdown', function () {
        mode = "fill";
        console.log("mode set to " + mode);
    });
    icons.addChild(fill);
    var end = new PIXI.Sprite(PIXI.loader.resources["assets/end.png"].texture);
    end.interactive = true;
    end.buttonMode = true;
    end.x = 420;
    end.width = 70;
    end.height = 70;
    end.on('pointerdown', function () {
        mode = "end";
        console.log("mode set to " + mode);
    });
    icons.addChild(end);
    var portal = new PIXI.Sprite(PIXI.loader.resources["assets/portal.png"].texture);
    portal.interactive = true;
    portal.buttonMode = true;
    portal.x = 490;
    portal.width = 70;
    portal.height = 70;
    portal.tint = "0x000";
    portal.on('pointerdown', function () {
        mode = "portal";
        console.log("mode set to " + mode);
    });
    icons.addChild(portal);
    for (var i = -1; i < 28 * zoom; i++) {
        var line = new PIXI.Sprite(new shapes_1["default"].rectangle(2, 640 * zoom, "#000000"));
        line.x = i * 32;
        line.type = "v";
        gridBlock.addChild(line);
        line.old = { "x": i * 32, "y": 0 };
    }
    for (var i = -1; i < 22 * zoom; i++) {
        var line = new PIXI.Sprite(new shapes_1["default"].rectangle(832 * zoom, 2, "#000000"));
        line.y = i * 32;
        ;
        line.type = "h";
        gridBlock.addChild(line);
        line.old = { "x": 0, "y": i * 32 };
    }
    renderer.view.onmousedown = function () {
        mouse = true;
        if (mode === "drag") {
            start.x = renderer.plugins.interaction.mouse.global.x * zoom;
            start.y = renderer.plugins.interaction.mouse.global.y * zoom;
        }
    };
    renderer.view.onmouseup = function () {
        mouse = false;
        if (mode === "drag") {
            gridBlock.children.forEach(function (line) {
                line.old.y = line.y;
                line.old.x = line.x;
            });
        }
    };
    var loc = new PIXI.Sprite();
    loc.old = { "x": 0, "y": 0 };
    loc.loc = true;
    gridBlock.addChild(loc);
    var maze = [];
    stage.addChild(gridBlock);
    stage.addChild(icons);
    stage.scale.x = 1 / zoom;
    stage.scale.y = 1 / zoom;
    var fillMarker = new PIXI.Sprite(shapes_1["default"].rectangle(30, 30, "#f00"));
    fillMarker.type = "fill";
    gridBlock.addChild(fillMarker);
    fillMarker.visible = false;
    var snakeMarker = new PIXI.Sprite(shapes_1["default"].rectangle(30, 30, "#0f0"));
    snakeMarker.type = "snake";
    gridBlock.addChild(snakeMarker);
    snakeMarker.visible = false;
    var endMarker = new PIXI.Sprite(shapes_1["default"].rectangle(30, 30, "#ff0"));
    endMarker.type = "end";
    gridBlock.addChild(endMarker);
    var markers = [fillMarker, snakeMarker, endMarker];
    markers.forEach(function (val) {
        val.old = { "x": 0, "y": 0 };
        val.coord = { "x": 0, "y": 0 };
        maze.push(val);
    });
    endMarker.visible = false;
    function loop() {
        if (mouse === true) {
            if ((mode === "draw" || mode === "erase" || mode === "snake" || mode === "fill" || mode === "end" || mode === "portal") && !((renderer.plugins.interaction.mouse.global.x * zoom < 500 + 70 * 3) && (renderer.plugins.interaction.mouse.global.y * zoom < 70))) {
                var coords = { "x": Math.round(renderer.plugins.interaction.mouse.global.x * zoom - loc.x), "y": Math.round(renderer.plugins.interaction.mouse.global.y * zoom - loc.y) };
                if (!(coords.x.mod(32) <= 2 || coords.y.mod(32) <= 2)) {
                    //find index...? ROUND UP TO NEAREST 32
                    var arr_1 = { "x": 0, "y": 0 };
                    arr_1.x = (Math.ceil((coords.x - 2) / 32) * 32) / 32 - 1;
                    arr_1.y = (Math.ceil((coords.y - 2) / 32) * 32) / 32 - 1;
                    if (mode === "draw" || mode === "portal") {
                        function collision(val) {
                            console.log(val.coord);
                            console.log(arr_1);
                            return !(val.coord.x === arr_1.x && val.coord.y === arr_1.y);
                        }
                        if (maze.every(collision) || maze.length === 0) {
                            var thing = new PIXI.Sprite(shapes_1["default"].rectangle(30, 30, "#333"));
                            thing.x = arr_1.x * 32 + 2 + loc.x;
                            thing.y = arr_1.y * 32 + 2 + loc.y;
                            thing.coord = { "x": arr_1.x, "y": arr_1.y };
                            thing.old = { "x": arr_1.x * 32 + 2 + loc.x, "y": arr_1.y * 32 + 2 + loc.y };
                            if (mode === "draw") {
                                thing.type = "cell";
                                maze.push(thing);
                            }
                            else if (mode === "portal") {
                                thing.type = "portal";
                                thing.id = prompt("Enter the id for the portal");
                                thing.target = prompt("Enter the target id for the portal");
                                thing.direction = prompt("Enter default direction for the portal");
                                thing.setTexture(shapes_1["default"].rectangle(30, 30, "#ff0"));
                                maze.push(thing);
                                mouse = false;
                            }
                            gridBlock.addChild(thing);
                        }
                    }
                    if (mode === "erase") {
                        maze.forEach(function (val) {
                            if (val.coord.x === arr_1.x && val.coord.y === arr_1.y) {
                                console.log(val.coord);
                                console.log(arr_1);
                                gridBlock.removeChild(val);
                                maze.splice(maze.indexOf(val), 1);
                            }
                        });
                    }
                    if (mode === "fill") {
                        fillMarker.visible = true;
                        fillMarker.x = arr_1.x * 32 + 2 + loc.x;
                        fillMarker.y = arr_1.y * 32 + 2 + loc.y;
                        fillMarker.coord = { "x": arr_1.x, "y": arr_1.y };
                        fillMarker.old = { "x": arr_1.x * 32 + 2 + loc.x, "y": arr_1.y * 32 + 2 + loc.y };
                    }
                    if (mode === "snake") {
                        snakeMarker.visible = true;
                        snakeMarker.x = arr_1.x * 32 + 2 + loc.x;
                        snakeMarker.y = arr_1.y * 32 + 2 + loc.y;
                        snakeMarker.coord = { "x": arr_1.x, "y": arr_1.y };
                        snakeMarker.old = { "x": arr_1.x * 32 + 2 + loc.x, "y": arr_1.y * 32 + 2 + loc.y };
                    }
                    if (mode === "end") {
                        endMarker.visible = true;
                        endMarker.x = arr_1.x * 32 + 2 + loc.x;
                        endMarker.y = arr_1.y * 32 + 2 + loc.y;
                        endMarker.coord = { "x": arr_1.x, "y": arr_1.y };
                        endMarker.old = { "x": arr_1.x * 32 + 2 + loc.x, "y": arr_1.y * 32 + 2 + loc.y };
                    }
                }
            }
            gridBlock.children.forEach(function (line) {
                if (mode === "drag") {
                    if (line.type === "v") {
                        line.x = (line.old.x + (renderer.plugins.interaction.mouse.global.x * zoom - start.x)).mod(832 * zoom);
                    }
                    else if (line.type === "h") {
                        line.y = (line.old.y + (renderer.plugins.interaction.mouse.global.y * zoom - start.y)).mod(640 * zoom);
                    }
                    else {
                        line.x = (line.old.x + (renderer.plugins.interaction.mouse.global.x * zoom - start.x));
                        line.y = (line.old.y + (renderer.plugins.interaction.mouse.global.y * zoom - start.y));
                    }
                }
            });
        }
        renderer.render(stage);
        requestAnimationFrame(loop);
    }
    loop();
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map