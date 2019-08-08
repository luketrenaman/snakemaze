export default function(sprite,x,y,func){
    sprite.buttonMode = true;
    sprite.interactive = true;
    sprite.x = x;
    sprite.y = y;
    sprite.on('click',function(){func();g.renderer.render(g.all);})
}
