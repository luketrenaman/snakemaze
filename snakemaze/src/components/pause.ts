import shapes from "../drawing/shapes";
import key from "../utilities/key-press";
import button from "./button";
import fps from "../utilities/fps";
import { TextStyleOptions } from "pixi.js";
export default class extends PIXI.Sprite{
/*
*/
    zIndex:number;
    zOrder:number
    pauseScreen:PIXI.Sprite;
    allow:boolean;
    veto:boolean;
    constructor(){
        super(shapes.rectangle(832, 640, "rgba(44, 62, 80,0.7)"))
        var a = this;
        this.visible = false;
        var text = new PIXI.Text("Game paused", {
            font: "52px Pixel",
            fill: "white"
        } as TextStyleOptions);
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
                g.all.removeChild(this);
                g.renderer.render(g.all);
                this.veto = true;
            })
        this.addChild(abort);
    }
    handle(renderloop:fps,gameloop:fps,background) {
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
        key.check(80, function() {
            if (a.allow) {
                a.visible = true;
                g.soundManager.visible = true;
                //background.zIndex = -2;
                a.zIndex = -3;
                g.all.updateLayersOrder();
                a.allow = false;
                console.log("render")
                g.renderer.render(g.all);
                gameloop.stop();
                renderloop.stop();
                key.waitUp(80, function() {
                    key.waitDown(80, wait);
                });
            }
        });
    };
};
