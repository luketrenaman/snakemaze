import Timer from "./timer.ts";
export default class extends Timer{
    going:boolean;
    ct:number;
    cb:Function;

    constructor(cb:(ct:number,obj:Object) => (void)){
        super(cb);
        requestAnimationFrame(this.draw);
    }
    start(){
        this.going = true;
        requestAnimationFrame(this.draw);
    }
    draw=()=>{
        if (this.going) {
            requestAnimationFrame(this.draw);
            this.ct++
            this.cb(this.ct,this);
        }
    }
}
