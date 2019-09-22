export default new class{
    map:Array<number>;
    tethers:Array<Object>;
    constructor(){
        var a = this;
        this.map = [];
        this.tethers = [];
    }
    listen = function() {
        var a = this;
        document.onkeydown = function(e) {
            e = e || window.event;
            e = e.which || e.keyCode || 0;
            if (a.map.indexOf(e) == -1) {
                a.map.push(e);
            }
            a.tethers.forEach(function(tether, index) {
                if (tether.type == "down") {
                    if (e === tether.key) {
                        tether.func();
                        if (!tether.perma) a.tethers.splice(index, 1);
                    }
                }
            });
        };
        document.onkeyup = function(e) {
            e = e || window.event;
            e = e.which || e.keyCode || 0;
                // use e.keyCode
            if (a.map.indexOf(e) != -1) {
                a.map.splice(a.map.indexOf(e), 1);
            }
            a.tethers.forEach(function(tether:object, index) {
                if (tether.type == "up") {
                    if (e === tether.key) {
                        tether.func();
                        if (!tether.perma) a.tethers.splice(index, 1);
                    }
                }
            });
        };
    };
    check(key, callback, not?) {
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
    waitUp(key, func, perma) {
        var a = this;
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
    waitDown(key, func, perma) {
        var a = this;
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
