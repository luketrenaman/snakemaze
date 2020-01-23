import Timer from "./timer.ts";
export default class extends Timer{
    going:boolean;
    ct:number;
    cb:Function;
    diff:number;
    then:number

    constructor(cb:(ct:number,obj:Object,diff:number) => (void)){
        super(cb);
        this.then = Date.now();
        this.diff;
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
            this.diff = (Date.now()-this.then)/1000;
            this.then = Date.now()
            this.cb(this.ct,this,this.diff);
        }
    }
}
