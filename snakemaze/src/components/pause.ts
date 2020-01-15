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
        let abort = new PIXI.Sprite(shapes.rectangle(64*5,64*2,"#000"));
        button(abort, 4 * 64, 5 * 64, () => {
                g.level.kill();
                this.veto = true;
                console.log(this);
            })
        this.addChild(abort);
    }
    handle(renderloop:fps,gameloop:fps,background) {
        let a = this;
        function wait() {
            if(!a.veto){
                gameloop.start();
                renderloop.start();
                a.visible = false;
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
                a.visible = true;
                g.soundManager.visible = true;
                //background.zIndex = -2;
                a.zIndex = -3;
                g.all.updateLayersOrder();
                a.allow = false;
                g.renderer.render(g.stage);
                gameloop.stop();
                renderloop.stop();
                key.waitUp(80, function() {
                    key.waitDown(80, wait);
                    key.waitUp(80, allow);
                });
            }
        });
    };
};
