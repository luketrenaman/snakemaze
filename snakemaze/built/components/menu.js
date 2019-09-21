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
var shapes_ts_1 = require("../drawing/shapes.ts");
var button_js_1 = require("./button.js");
var SoundManager = /** @class */ (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        var _this = _super.call(this) || this;
        _this.x = 832 - 128;
        _this.y = 640 - 64;
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
        button_js_1.default(_this, 0, 0, function () {
            if (this.enabled) {
                this.setTexture(textureOn);
            }
            else {
                this.setTexture(textureOff);
            }
            this.enabled = !this.enabled;
        });
        return _this;
    }
    return SoundMenu;
}(PIXI.Sprite));
function default_1() {
    console.log("FABRICATION");
    g.manager = new MenuManager();
    // -- HANDLE MUSIC --
    g.soundManager = new SoundManager();
    g.soundManager.addChild(new SoundMenu(0, 0, PIXI.loader.resources["assets/music.png"].texture, PIXI.loader.resources["assets/nomusic.png"].texture));
    g.soundManager.addChild(new SoundMenu(64, 0, shapes_ts_1.default.rectangle(64, 64, "#00f"), shapes_ts_1.default.rectangle(64, 64, "#0ff")));
    g.all.addChild(g.soundManager);
    // -- START SCREEN --
    var startScreen = new Menu("start", true);
    var background = new PIXI.Sprite(PIXI.loader.resources["assets/titlescreen.png"].texture);
    startScreen.addChild(background);
    var start = new PIXI.Sprite(PIXI.loader.resources["assets/start.png"].texture);
    startScreen.addChild(start);
    button_js_1.default(start, 64 * 4 + 32, 64 * 6, function () {
        g.manager.show("level");
    });
    // -- LEVEL SELECT --
    var levelSelect = new Menu("level", true);
    var _loop_1 = function (i) {
        var _loop_2 = function (j) {
            var lev = new PIXI.Sprite(PIXI.loader.resources["assets/level-1.png"].texture);
            levelSelect.addChild(lev);
            button_js_1.default(lev, i * 128 + 128, j * 128 + 128, function () {
                g.level = new g.newLevel(i + j * 5);
            });
        };
        for (var j = 0; j < 2; j++) {
            _loop_2(j);
        }
    };
    for (var i = 0; i < 5; i++) {
        _loop_1(i);
    }
    // -- QUIT BUTTON --
    var exit = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    levelSelect.addChild(exit);
    button_js_1.default(exit, 0, 0, function () {
        g.manager.show("start");
    });
    // -- MENU TO SHOW ON DEATH --
    //TODO
    var exit2 = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
    button_js_1.default(exit2, 0, 0, function () {
        g.manager.show("start");
        g.level.kill();
    });
    var deathMenu = new Menu("death", false);
    var deathBase = new PIXI.Sprite(shapes_ts_1.default.rectangle(64 * 6, 64 * 4, "#000"));
    deathBase.x = 832 / 2 - deathBase.width / 2;
    deathBase.y = 640 / 2 - deathBase.height / 2;
    deathMenu.zOrder = -4;
    deathMenu.addChild(deathBase);
    deathMenu.addChild(exit2);
    var victoryMenu = new Menu("victory", false);
    var victoryBase = new PIXI.Sprite(shapes_ts_1.default.rectangle(64 * 6, 64 * 4, "#fff"));
    victoryBase.x = 832 / 2 - victoryBase.width / 2;
    victoryBase.y = 640 / 2 - victoryBase.height / 2;
    victoryMenu.zOrder = -4;
    victoryMenu.addChild(victoryBase);
    victoryMenu.addChild(exit2);
}
exports.default = default_1;
