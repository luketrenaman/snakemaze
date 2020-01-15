export default class{
    going:boolean;
    ct:number;
    cb:Function;

    constructor(cb:(ct:number,obj:Object) => (void)){
        this.going = true;
        this.ct = 0;
        this.cb = cb;
    }
    //start
    resume(){
        this.start();
    }
    toggle(){
        this.going = !this.going;
    }
    stop(){
        this.going = false;
    }
    pause(){
        this.stop();
    }
    restart(){
        this.ct = 0;
    }
    //draw
}