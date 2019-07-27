import shapes from "./../drawing/shapes.js";
function segment(type) {
    var obj = new PIXI.Sprite(PIXI.loader.resources["assets/snake-" + type + ".png"].texture);
    //
    obj.scale.x = 0.5;
    obj.scale.y = 0.5;
    //
    obj.anchor.x = 0.5;
    obj.anchor.y = 0.5;
    obj.x = -16 - 416;
    obj.y = -16 - 320;
    g.stage.addChild(obj);
    if (type === "head" || type === "tail") {
        obj.zIndex = 0;
    }
    obj.segmentType = type;
    return obj;
}
export default class buildSnake {
    constructor() {
        this.exit = false;
        this.locations = [
            {x:g.maze.snake.x, y:g.maze.snake.y},
            {x:g.maze.snake.x, y:g.maze.snake.y},
            {x:g.maze.snake.x, y:g.maze.snake.y}
        ]
        this.sprites = [];
        this.gems = [];
        this.sprites.push(new segment("head"));
        this.sprites.push(new segment("body"));
        this.sprites.push(new segment("tail"));
        g.stage.y += 320 - this.sprites[0].worldTransform.ty;
        g.stage.x += 416 - this.sprites[0].worldTransform.tx;
        this.counter = new PIXI.Container();
        this.counter.zOrder = -2;
        this.counter.x = 832 - 32 * 4
        this.counter.y = 640 - 32 * 3;
        this.counter.addChild(new PIXI.Sprite(shapes.rectangle(128, 96, "rgba(44, 62, 80,0.7)")))
        this.counter.rules = {
            "current": 0,
            "max": 25
        }
        let blue = new PIXI.Sprite(PIXI.loader.resources["assets/gem-1.png"].texture)
        //
        blue.scale.x = 0.5;
        blue.scale.y = 0.5;
        //
        blue.x = 8;
        blue.y = 8;
        this.counter.addChild(blue);
        let red = new PIXI.Sprite(PIXI.loader.resources["assets/gem-2.png"].texture)
        //
        red.scale.x = 0.5;
        red.scale.y = 0.5;
        //
        red.x = 48;
        red.y = 8;
        this.counter.addChild(red);
        let yellow = new PIXI.Sprite(PIXI.loader.resources["assets/gem-3.png"].texture)
        //
        yellow.scale.x = 0.5;
        yellow.scale.y = 0.5;
        //
        yellow.x = 88;
        yellow.y = 8;
        this.counter.addChild(yellow);
        let count = new PIXI.Text("00", {
            font: "52px pixelmono",
            fill: "white"
        });
        count.y = 52;
        count.x = 8;
        this.counter.display = count;
        this.counter.addChild(count);
        let total = new PIXI.Text("/" + (this.counter.rules.max < 10 ? "0" + this.counter.rules.max : this.counter.rules.max), {
            font: "30px pixelmono",
            fill: "white"
        })
        total.x = count.width + 16;
        total.y = 52;
        this.counter.addChild(total);
        g.all.addChild(this.counter);
        if(g.maze.mode === "normal"){
            this.fruit()
            this.fruit()
            this.fruit()
        }
        else{
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
        this.direction = g.maze.snake.direction
    }
    move(x, y,portal) {
        for (let i = this.locations.length - 1; i > 0; i--) {
            this.locations[i] = Object.assign({},this.locations[i - 1])
        }
        this.locations[0].x += x;
        this.locations[0].y -= y;
        this.sprites[0].rotation = (y / 2 + x / 2 + (x != 0 ? 0.5 : 0) + .5) * Math.PI;
            for (let i = 0; i < this.sprites.length; i++) {
                //Define location variables
                let p = this.locations[i - 1];
                let c = this.locations[i];
                let a = this.locations[i + 1];
                //Position segments based on location
                this.sprites[i].x = c.x * 32 + 16
                this.sprites[i].y = c.y * 32 + 16
                //Calculate location based on the direction of motion
                if (i !== 0) {
                    if (this.sprites[i].segmentType === "tail") {
                        let ct = 1;
                        while (c.x === p.x && c.y === p.y) {
                            ct++
                            p = this.locations[i - ct];
                        }
                    }
                    let x = (p.x - c.x);
                    let y = (c.y - p.y);
                    this.sprites[i].rotation = (y / 2 + x / 2 + (x != 0 ? 0.5 : 0) + .5) * Math.PI
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
                ]
                //If a body segment...
                if (this.sprites[i].segmentType === "body") {
                    this.sprites[i].visible = !(this.locations[this.locations.length - 1].x === this.locations[i].x && this.locations[this.locations.length - 1].y === this.locations[i].y)
                    //Test for corners, if not a corner, become a body segment
                    if (c.x === p.x && p.x === a.x || c.y === p.y && p.y === a.y) {
                        this.sprites[i].setTexture(PIXI.loader.resources["assets/snake-body.png"].texture)
                    } else {
                        //Check for right corners by finding comparison between values
                        var compOne = [c.x - p.x, c.y - p.y];
                        var compTwo = [a.x - c.x, a.y - c.y];
                        var rightBool = false;
                        //Loop through right turns...
                        right.forEach(function(val) {
                            if (compOne.equals(val[0]) && compTwo.equals(val[1])) {
                                rightBool = true;
                            }
                        })
                        //If there is a right turn, rotate accordingly
                        if (rightBool) {
                            this.sprites[i].rotation += Math.PI * .5
                        }
                        //Since this is a corner apply the corner texture
                        this.sprites[i].setTexture(PIXI.loader.resources["assets/snake-corner.png"].texture)
                    }
                }
            
            }
        this.collide();
    }
    eat() {
        let a = this;
        let piece = new segment("body");
        this.sprites.splice(this.sprites.length - 1, 0, piece);
        this.locations.splice(this.locations.length - 1, 0, this.locations[this.locations.length - 2]);
        piece.x = (this.locations.length-1).x*32;
        piece.y = (this.locations.length-1).y*32;
        this.layer();
        this.counter.rules.current++;
        this.counter.display.text = this.counter.rules.current < 10 ? "0" + this.counter.rules.current : this.counter.rules.current;
        if (this.counter.rules.current == this.counter.rules.max) {
            let len = a.gems.length
            for (let i = len - 1; i >= 0; i--) {
                g.stage.removeChild(a.gems[i])
                a.gems.splice(i, 1)
            }

            function check() {
                let spawn = {
                    x:Math.floor(g.maze.data[0].length*Math.random()),
                    y:Math.floor(g.maze.data.length*Math.random())
                };
                let safe = a.locations.every(function(val) {
                    return !(val.x === spawn.x && val.y === spawn.y);
                }) && g.maze.data[spawn.y][spawn.x] === 2;
                if (safe) {
                    a.exit = true;
                    a.exitSprite = new PIXI.Sprite(PIXI.loader.resources["assets/rainbow.json"].textures["rainbow1.png"]);
                    a.exitSprite.cycle = 1;
                    a.exitSprite.x = spawn.x * 32;
                    a.exitSprite.y = spawn.y * 32;
                    console.log(spawn)
                    a.exitSprite.scale.x = 1 / 6;
                    a.exitSprite.scale.y = 1 / 6;
                    a.exitSprite.coord = spawn;
                    a.exitSprite.zIndex = 1;
                    g.stage.addChild(a.exitSprite);
                } else {
                    check()
                }
            }
            check()
        }
    }
    layer() {
        for (let i = 0; i < this.sprites.length; i++) {
            this.sprites[i].zIndex = 1;
        }
        g.stage.updateLayersOrder();
    }
    collide() {
        let a = this;
        let death = false;
        let collide = false;
        for (let i = 1; i < this.locations.length; i++) {
            if (this.locations[0].x === this.locations[i].x && this.locations[0].y === this.locations[i].y) {
                death = true;
            }
        }
        if (g.maze.data[this.locations[0].y] != undefined && g.maze.data[this.locations[0].y][this.locations[0].x] === 1) {
            death = true;
        }
        if(g.maze.data[this.locations[0].y] != undefined && typeof g.maze.data[this.locations[0].y][this.locations[0].x] === "object"){
            let portal = g.maze.data[this.locations[0].y][this.locations[0].x];
            let target;
            g.maze.data.forEach(function(val){
                val.forEach(function(m){
                    if(m.id === portal.target){
                        target = m;
                    }
                });
            });
            console.log(target)
            this.locations[0].x = target.x;
            this.locations[0].y = target.y;
            this.direction = target.direction;
            switch(target.direction){
                case "left":
                this.move(-1,0);;
                break;
                case "right":
                this.move(1,0);
                break;
                case "up":
                this.move(0,-1);
                break;
                case "down":
                this.move(0,1);
                break;
            }
            return;
        }
        if (death) {
            //TODO = HANDLE DEATH OF THE SNAKE WITH A DEATH SCREEN

            collide = true;
            g.level.death();
        }
        if (this.counter.rules.current != this.counter.rules.max) {
            this.gems.forEach((gem)=> {
                if (this.locations[0].x === gem.coord.x && this.locations[0].y === gem.coord.y) {
                    a.gems.splice(a.gems.indexOf(gem), 1);
                    g.stage.removeChild(gem);
                    a.fruit();
                    a.eat();
                }
            })
        }
        if (this.exit) {
            this.exitSprite.cycle++;
            this.exitSprite.cycle %= 8;
            this.exitSprite.setTexture(PIXI.loader.resources["assets/rainbow.json"].textures["rainbow" + this.exitSprite.cycle + ".png"]);
            if (this.locations[0].x === this.exitSprite.coord.x && this.locations[0].y === this.exitSprite.coord.y) {
                //TODO = WIN SCREEN
                collide = true;
                g.level.death()
            }
        }
        return collide;

    }
    fruit() {
        let a = this;

        function check(){
            let spawn = {
                x:Math.floor(g.maze.data[0].length*Math.random()),
                y:Math.floor(g.maze.data.length*Math.random())
            };
            let safe = a.locations.every(function(val) {
                return !(val.x === spawn.x && val.y === spawn.y);
            }) && a.gems.every(function(val) {
                    return !(val.coord.x === spawn.x && val.coord.y === spawn.y);
                })
             && g.maze.data[spawn.y][spawn.x] === 2;
            if (safe) {
                let gem = new PIXI.Sprite(PIXI.loader.resources["assets/gem-" + Math.ceil(Math.random() * 3) + ".png"].texture)
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
            } else {
                check()
            }
        }
        check()
    }
}
