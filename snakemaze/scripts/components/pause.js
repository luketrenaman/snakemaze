import shapes from "./../drawing/shapes.js";
import key from "./../utilities/key-press.js";
import button from "./button.js";
export default class {
/*
*/
    constructor(){
        var a = this;
        var pauseScreen = new PIXI.Sprite(shapes.rectangle(832, 640, "rgba(44, 62, 80,0.7)"));
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
        let abort = new PIXI.Sprite(shapes.rectangle(64*5,64*2,"#000"));
        button(abort,4*64,5*64,()=>{
            g.level.kill();
            this.veto = true;
            console.log(this)
        })
        this.obj.addChild(abort);
    }
    handle(obj,background) {
        let a = this;
        function wait() {
            if(!a.veto){
                obj.start();
                a.obj.visible = false;
                g.soundManager.visible = false;
                background.zIndex = 500;
                g.all.updateLayersOrder();
            }
        }

        function allow() {
            if(!a.veto){
                a.allow = true;
            }
        }
        key.check(80, function() {
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
                key.waitUp(80, function() {
                    key.waitDown(80, wait);
                    key.waitUp(80, allow);
                });
            }
        });
    };
};
