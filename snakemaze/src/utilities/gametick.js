import Timer from "./timer";
export default class extends Timer{

    constructor(cb,delay){
        super(cb);
        this.delay = delay;
        this.draw();
    }
    start(){
        this.going = true;
        setTimeout(this.draw.bind(this),this.delay);
    }
    draw(){
        if (this.going) {
            setTimeout(this.draw.bind(this),this.delay);
            this.ct++
            this.cb(this.ct,this);
        }
    }
}