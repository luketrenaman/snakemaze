import shapes from "./drawing/shapes.js";
let stage = new PIXI.Container();
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
// create a renderer instance.
let renderer = PIXI.autoDetectRenderer(832, 640, null, true);
renderer.backgroundColor = 0xcccccc;
renderer.interactive = true;
// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
let text = document.createElement("textarea");
document.body.appendChild(text);
let start = {"x":0,"y":0}
let prev = {"x":0,"y":0}
let mouse = false;
// create a new Sprite using the texture
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
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
function floodFill(x, y,arr){
    if(arr[y] === undefined) return;
    if(arr[y][x] === undefined) return;
    if(alreadyFilled(x, y,arr)) return;
    ff(x, y,arr);

    floodFill(x,   y-1,arr);
    floodFill(x+1, y  ,arr);
    floodFill(x,   y+1,arr);
    floodFill(x-1, y  ,arr);
}

function ff(x, y,arr){
    arr[y][x] = 2;
}

function alreadyFilled(x, y,arr){
    console.log(arr[y][x])
    return arr[y][x] === 2 || arr[y][x] === 1 || typeof arr[y][x] === "object";
}

    let zoom = 2;
    let mode = "drag";
    let gridBlock = new PIXI.Container()
    let icons = new PIXI.Container()
    let drag = new PIXI.Sprite(PIXI.loader.resources["assets/drag.png"].texture);
    drag.interactive = true;
    drag.buttonMode = true;
    drag.width = 70;
    drag.height = 70;
    drag.on('pointerdown',function(){
        mode = "drag";
        console.log("mode set to " + mode)
    })
    icons.addChild(drag);
    let draw = new PIXI.Sprite(PIXI.loader.resources["assets/pencil.png"].texture);
    draw.interactive = true;
    draw.buttonMode = true;
    draw.x = 70;
    draw.width = 70;
    draw.height = 70;
    draw.on('pointerdown',function(){
        mode = "draw";
        console.log("mode set to " + mode)
    })
    icons.addChild(draw);
    let eraser = new PIXI.Sprite(PIXI.loader.resources["assets/eraser.png"].texture);
    eraser.interactive = true;
    eraser.buttonMode = true;
    eraser.x = 140;
    eraser.width = 70;
    eraser.height = 70;
    eraser.on('pointerdown',function(){
        mode = "erase";
        console.log("mode set to " + mode)
    })
    icons.addChild(eraser);
    let download = new PIXI.Sprite(PIXI.loader.resources["assets/download.png"].texture);
    download.interactive = true;
    download.buttonMode = true;
    download.x = 210;
    download.width = 70;
    download.height = 70;
    download.on('pointerdown',function(){
        let coords = []
        var ty = undefined;
        var tx = undefined;
        var ly = undefined;
        var lx = undefined;
        maze.forEach(function(val){
            coords.push({"x":val.coord.x,"y":val.coord.y,"direction":val.direction,"type":val.type,"id":val.id,"target":val.target})
            if(val.type === "cell" || val.type === "portal"){
            if(val.coord.x < lx || lx === undefined){
                lx = val.coord.x
            }
            if(val.coord.x > tx || tx === undefined){
                tx = val.coord.x
            }
            if(val.coord.y < ly || ly === undefined){
                ly = val.coord.y
            }
            if(val.coord.y > ty || ty === undefined){
                ty = val.coord.y
            }
            }
        })
        console.log(ty," ",tx," ",ly," ",lx)
        console.log(coords)
        let level = {}
        let map = []
        for(let i = 0;i < (ty-ly+1);i++){
            map.push([])
            for(let j = 0; j < (tx-lx+1);j++){
                map[i].push(0)
            }
        }
        coords.forEach(function(val){
            switch(val.type){
                case "cell":
                    map[val.y-ly][val.x-lx] = 1;
                break;
                case "snake":
                    level.snake = {
                        "x":val.x-lx,
                        "y":val.y-ly,
                        "direction":val.direction
                    }
                break;
                case "end":
                    level.end = {
                        "x":val.x-lx,
                        "y":val.y-ly
                    }
                break;
                case "portal":
                    map[val.y-ly][val.x-lx] = {
                        "x":val.x-lx,
                        "y":val.y-ly,
                        "id":val.id,
                        "target":val.target,
                        "direction":val.direction
                    };
                break;
            }
        })
        coords.forEach(function(val){
            if(val.type === "fill"){
                floodFill(val.x-lx,val.y-ly,map)
            }
        })
        level.data = map;
        console.log(JSON.stringify(level));
        text.innerHTML = JSON.stringify(level);
    })
    icons.addChild(download);
    let snake = new PIXI.Sprite(PIXI.loader.resources["assets/snake.png"].texture);
    snake.interactive = true;
    snake.buttonMode = true;
    snake.x = 280;
    snake.width = 70;
    snake.height = 70;
    snake.on('pointerdown',function(){
        mode = "snake";
        snakeMarker.direction = prompt("Direction?");
        console.log("mode set to " + mode)
    })
    icons.addChild(snake)
    let fill = new PIXI.Sprite(PIXI.loader.resources["assets/fill.png"].texture);
    fill.interactive = true;
    fill.buttonMode = true;
    fill.x = 350;
    fill.width = 70;
    fill.height = 70;
    fill.on('pointerdown',function(){
        mode = "fill";
        console.log("mode set to " + mode)
    })
    icons.addChild(fill)
    let end = new PIXI.Sprite(PIXI.loader.resources["assets/end.png"].texture);
    end.interactive = true;
    end.buttonMode = true;
    end.x = 420;
    end.width = 70;
    end.height = 70;
    end.on('pointerdown',function(){
        mode = "end";
        console.log("mode set to " + mode);
    })
    icons.addChild(end)
    let portal = new PIXI.Sprite(PIXI.loader.resources["assets/portal.png"].texture);
    portal.interactive = true;
    portal.buttonMode = true;
    portal.x = 490;
    portal.width = 70;
    portal.height = 70;
    portal.tint = "0x000";
    portal.on('pointerdown',function(){
        mode = "portal";
        console.log("mode set to " + mode);
    })
    icons.addChild(portal)
    for(let i = -1; i < 28*zoom;i++){
        let line = new PIXI.Sprite(new shapes.rectangle(2,640*zoom,"#000000"));
        line.x = i*32;
        line.type = "v";
        gridBlock.addChild(line);
        line.old = {"x":i*32,"y":0};
    }
    for(let i = -1; i < 22*zoom;i++){
        let line = new PIXI.Sprite(new shapes.rectangle(832*zoom,2,"#000000"));
        line.y = i*32;;
        line.type = "h";
        gridBlock.addChild(line);
        line.old = {"x":0,"y":i*32};
    }
    renderer.view.onmousedown = function(){
        mouse = true;
        if(mode === "drag"){
            
            start.x = renderer.plugins.interaction.mouse.global.x*zoom;
            start.y = renderer.plugins.interaction.mouse.global.y*zoom;
        }
    }
    renderer.view.onmouseup = function(){
        mouse = false
        if(mode === "drag"){
            
            gridBlock.children.forEach(function(line){
                line.old.y = line.y
                line.old.x = line.x
            })
        }
    }
    let loc = new PIXI.Sprite();
    loc.old = {"x":0,"y":0}
    loc.loc = true;
    gridBlock.addChild(loc)


    let maze = [];
    stage.addChild(gridBlock)
    stage.addChild(icons)
    stage.scale.x = 1 / zoom;
    stage.scale.y = 1 / zoom;
    let fillMarker = new PIXI.Sprite(shapes.rectangle(30,30,"#f00"));
    fillMarker.type = "fill"
    gridBlock.addChild(fillMarker)
    fillMarker.visible = false;
    let snakeMarker = new PIXI.Sprite(shapes.rectangle(30,30,"#0f0"));
    snakeMarker.type = "snake"
    gridBlock.addChild(snakeMarker)
    snakeMarker.visible = false;
    let endMarker = new PIXI.Sprite(shapes.rectangle(30,30,"#ff0"));
    endMarker.type = "end"
    gridBlock.addChild(endMarker)
    let markers = [fillMarker,snakeMarker,endMarker]
    markers.forEach(function(val){
        val.old = {"x":0,"y":0}
        val.coord = {"x":0,"y":0}
        maze.push(val);
    })
    endMarker.visible = false;
    function loop(){
        if(mouse === true){
            if((mode === "draw" || mode === "erase" || mode === "snake" || mode === "fill" || mode === "end" || mode === "portal") && !((renderer.plugins.interaction.mouse.global.x*zoom < 500 + 70*3) && (renderer.plugins.interaction.mouse.global.y*zoom < 70))){
                let coords = {"x":Math.round(renderer.plugins.interaction.mouse.global.x*zoom-loc.x),"y":Math.round(renderer.plugins.interaction.mouse.global.y*zoom-loc.y)}
                if(!(coords.x.mod(32) <= 2 || coords.y.mod(32) <= 2)){
                    //find index...? ROUND UP TO NEAREST 32
                    let arr = {"x":0,"y":0}
                    arr.x = (Math.ceil((coords.x-2)/32)*32)/32-1
                    arr.y = (Math.ceil((coords.y-2)/32)*32)/32-1
                    if(mode === "draw" || mode === "portal"){
                        function collision(val){
                            console.log(val.coord)
                            console.log(arr)
                            return !(val.coord.x === arr.x && val.coord.y === arr.y);
                        }
                        if(maze.every(collision) || maze.length === 0){
                            let thing = new PIXI.Sprite(shapes.rectangle(30,30,"#333"))
                            thing.x = arr.x*32 +2+loc.x;
                            thing.y = arr.y*32 +2+loc.y;
                            thing.coord = {"x":arr.x,"y":arr.y}
                            thing.old = {"x":arr.x*32+2+loc.x,"y":arr.y*32+2+loc.y}
                            if(mode === "draw"){
                                thing.type = "cell";
                                maze.push(thing);
                            } else if(mode === "portal"){
                                thing.type = "portal";
                                thing.id = prompt("Enter the id for the portal");
                                thing.target = prompt("Enter the target id for the portal");
                                thing.direction = prompt("Enter default direction for the portal");
                                maze.push(thing);
                                mouse = false;
                            }
                            gridBlock.addChild(thing)
                        }
                    }
                    if(mode === "erase"){
                        maze.forEach(function(val){
                            if(val.coord.x === arr.x && val.coord.y === arr.y){
                                console.log(val.coord)
                                console.log(arr)
                                gridBlock.removeChild(val);
                                maze.splice(maze.indexOf(val),1);
                            }
                        })
                    }
                    if(mode === "fill"){
                        fillMarker.visible = true;
                        fillMarker.x = arr.x*32 +2+loc.x;
                        fillMarker.y = arr.y*32 +2+loc.y;
                        fillMarker.coord = {"x":arr.x,"y":arr.y}
                        fillMarker.old = {"x":arr.x*32+2+loc.x,"y":arr.y*32+2+loc.y}
                    }
                    if(mode === "snake"){
                        snakeMarker.visible = true;
                        snakeMarker.x = arr.x*32 +2+loc.x;
                        snakeMarker.y = arr.y*32 +2+loc.y;
                        snakeMarker.coord = {"x":arr.x,"y":arr.y}
                        snakeMarker.old = {"x":arr.x*32+2+loc.x,"y":arr.y*32+2+loc.y}
                    }
                    if(mode === "end"){
                        endMarker.visible = true;
                        endMarker.x = arr.x*32 +2+loc.x;
                        endMarker.y = arr.y*32 +2+loc.y;
                        endMarker.coord = {"x":arr.x,"y":arr.y}
                        endMarker.old = {"x":arr.x*32+2+loc.x,"y":arr.y*32+2+loc.y}
                    }
                }}
                    gridBlock.children.forEach(function(line){
            if(mode === "drag"){
            if(line.type === "v"){
                line.x = (line.old.x+(renderer.plugins.interaction.mouse.global.x*zoom-start.x)).mod(832*zoom);
            } else if(line.type === "h"){
                line.y = (line.old.y+(renderer.plugins.interaction.mouse.global.y*zoom-start.y)).mod(640*zoom);
            } else{
                line.x = (line.old.x+(renderer.plugins.interaction.mouse.global.x*zoom-start.x))
                line.y = (line.old.y+(renderer.plugins.interaction.mouse.global.y*zoom-start.y))
            }
            }
        })
            
            
        }
        renderer.render(stage);
        requestAnimationFrame(loop);
    }
    loop()
}
