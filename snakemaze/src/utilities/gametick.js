import Timer from "./timer";
export default class extends Timer{

    constructor(cb,delay){
        super(cb);
        this.delay = delay;
        this.draw();
    }
    start(){
        this.going = true;
        setTimeout(this.draw,this.delay);
    }
    draw=()=>{
        if (this.going) {
            setTimeout(this.draw,this.delay);
            this.ct++
            this.cb(this.ct,this);
        }
    }
}