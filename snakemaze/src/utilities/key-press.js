export default new class{
    constructor(){
        var a = this;
        this.map = [];
        this.tethers = [];
        this.moveKeys = [];
        this.mostRecentKey;
    }
    listen = function() {
        var a = this;
        let addMove = (key) =>{
            if(this.moveKeys.indexOf(key) === -1){
                this.moveKeys.unshift(key);
            }
        }
        let reMove = (key) => {
            if(this.moveKeys.indexOf(key) !== -1){
                this.moveKeys.splice(this.moveKeys.indexOf(key),1);
            }
        }
        document.onkeydown = (e) => {
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
            switch(e){
                case 65:
                case 37:
                case 68:
                case 39:
                case 87:
                case 38:
                case 83:
                case 40:
                    this.mostRecentKey = e;
                    addMove(e);
                break;
            }
        };
        document.onkeyup = function(e) {
            e = e || window.event;
            e = e.which || e.keyCode || 0;
                // use e.keyCode
            if (a.map.indexOf(e) != -1) {
                a.map.splice(a.map.indexOf(e), 1);
            }
            a.tethers.forEach(function(tether, index) {
                if (tether.type == "up") {
                    if (e === tether.key) {
                        tether.func();
                        if (!tether.perma) a.tethers.splice(index, 1);
                    }
                }
            });
            switch(e){
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
    check(key, callback, not) {
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
        if(typeof key != "object"){
            key = [key]
        }
        if (perma === undefined) {
            perma = false;
        }
        key.forEach(function(keys){
            a.tethers.push({
                "key": keys,
                "func": func,
                "type": "up",
                "perma": perma
            });
        })
    };
    waitDown(key, func, perma) {
        var a = this;
        if(typeof key != "object"){
            key = [key]
        }
        if (perma === undefined) {
            perma = false;
        }
        key.forEach(function(keys){
            a.tethers.push({
                "key": keys,
                "func": func,
                "type": "down",
                "perma": perma
            });
        })
    };
}();
