export default new function() {
    var a = this;
    this.renderer = "";
    this.canvas = function(width:number, height:number) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        return {
            "canvas": canvas,
            "ctx": ctx
        };
    };
    this.rectangle = function(width:number, height:number, color:string) {
        var b = a.canvas(width, height);
        b.ctx.fillStyle = color;
        b.ctx.fillRect(0, 0, width, height);
        return PIXI.Texture.fromCanvas(b.canvas);
    };
    this.circle = function(radius:number, color:string) {
        var b = a.canvas(radius * 2, radius * 2);
        b.ctx.fillStyle = color;
        b.ctx.beginPath();
        b.ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
        b.ctx.fill();
        return PIXI.Texture.fromCanvas(b.canvas);
    };
}();
