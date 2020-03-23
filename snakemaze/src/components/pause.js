import shapes from "../drawing/shapes";
import key from "../utilities/key-press";
import button from "./button";
export default class extends PIXI.Sprite{
/*
*/
    constructor(){
        super(shapes.rectangle(832, 640, "rgba(44, 62, 80,0.7)"))
        var a = this;
        this.visible = false;
        var text = new PIXI.Text("Game paused", {
            font: "52px Pixel",
            fill: "white"
        });
        text.anchor.x = 0.5;
        text.x = 416;
        text.y = 200;
        this.addChild(text);
        this.zOrder = -3;
        this.allow = true;
        this.veto = false;
        g.all.addChild(this);
        let abort = new PIXI.Sprite(PIXI.loader.resources["assets/back.png"].texture);
        button(abort, 32, 32, () => {
                g.level.kill();
                g.manager.show("level");
                g.renderer.render(g.all);
                this.veto = true;
            })
        this.addChild(abort);
    }
    removeHandlers(){
        key.tethers = key.tethers.filter(function(val){
            return !(val.keys[0] === 80 && val.keys[1] === 32);
        })
    }
    handle(renderloop,gameloop,background) {
        let a = this;
        function wait() {
            if(!a.veto){
                gameloop.start();
                renderloop.then = Date.now();
                renderloop.start();
                a.visible = false;
                g.soundManager.visible = false;
                background.zIndex = 500;
                g.all.updateLayersOrder();
            }
        }

        function allow() {
            if(!a.veto){
                a.allow = true
            }
        }
        if (a.allow) {
            key.check([80,32], function() {
                a.visible = true;
                g.soundManager.visible = true;
                g.manager.current = "pause";
                //background.zIndex = -2;
                a.zIndex = -3;
                g.all.updateLayersOrder();
                a.allow = false;
                g.renderer.render(g.all);
                gameloop.stop();
                renderloop.stop();
                key.waitUp([80,32], function() {
                    key.waitDown([80,32], wait);
                    key.waitUp([80,32], allow);
                });
            });
        }
    };
};
