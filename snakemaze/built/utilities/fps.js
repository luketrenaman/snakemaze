"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(cb) {
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
}
exports.default = default_1;
