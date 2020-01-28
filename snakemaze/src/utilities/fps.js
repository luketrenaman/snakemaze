import Timer from "./timer";
export default class extends Timer{

    constructor(cb){
        super(cb);
        this.then = Date.now();
        this.diff;
        requestAnimationFrame(this.draw.bind(this));
    }
    start(){
        this.going = true;
        requestAnimationFrame(this.draw.bind(this));
    }
    draw(){
        if (this.going) {
            requestAnimationFrame(this.draw.bind(this));
            this.ct++;
            this.diff = (Date.now()-this.then)/1000;
            this.then = Date.now();
            this.cb(this.ct,this,this.diff);
        }
    }
}
