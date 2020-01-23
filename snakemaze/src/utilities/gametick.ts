import Timer from "./timer.ts";
export default class extends Timer{
    going:boolean;
    ct:number;
    cb:Function;
    diff:number;
    then:number;
    delay:number;

    constructor(cb:(ct:number,obj:Object) => (void),delay:Number){
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