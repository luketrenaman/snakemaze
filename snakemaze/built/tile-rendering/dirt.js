"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(x, dbg) {
    var shapes = require("../drawing/shapes");
    var lighten = require("./lighten");
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
            }
            else {
                if (x[bounds[Math.floor(j)][Math.floor(i)]] === 0) {
                    //Grass
                    canvas.ctx.fillStyle = "#" + (lighten("006600", Math.random() * -5));
                }
                else {
                    //Not Grass
                    canvas.ctx.fillStyle = "#" + (lighten("006600", Math.random() * 10 + 5));
                }
            }
            canvas.ctx.fillRect(i * 5.333, j * 5.333, 6, 6);
        }
    }
    return PIXI.Texture.fromCanvas(canvas.canvas);
}
exports.default = default_1;
