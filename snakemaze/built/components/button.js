"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sprite, x, y, func) {
    sprite.buttonMode = true;
    sprite.interactive = true;
    sprite.x = x;
    sprite.y = y;
    sprite.on('click', function () { func(); g.renderer.render(g.all); });
}
exports.default = default_1;
