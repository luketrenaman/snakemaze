"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shapes_js_1 = require("../drawing/shapes.js");
var key_press_js_1 = require("../utilities/key-press.js");
var button_js_1 = require("./button.js");
var default_1 = /** @class */ (function () {
    function default_1() {
        var _this = this;
        var a = this;
        var pauseScreen = new PIXI.Sprite(shapes_js_1.default.rectangle(832, 640, "rgba(44, 62, 80,0.7)"));
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
        var abort = new PIXI.Sprite(shapes_js_1.default.rectangle(64 * 5, 64 * 2, "#000"));
        button_js_1.default(abort, 4 * 64, 5 * 64, function () {
            g.level.kill();
            _this.veto = true;
            console.log(_this);
        });
        this.obj.addChild(abort);
    }
    default_1.prototype.handle = function (obj, background) {
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
        key_press_js_1.default.check(80, function () {
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
                key_press_js_1.default.waitUp(80, function () {
                    key_press_js_1.default.waitDown(80, wait);
                    key_press_js_1.default.waitUp(80, allow);
                });
            }
        });
    };
    ;
    return default_1;
}());
exports.default = default_1;
;
