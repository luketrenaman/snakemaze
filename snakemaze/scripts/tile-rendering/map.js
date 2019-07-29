module.exports = function(arr,tiles) {
    //Map size is 20 blocks tall and 32 wide
    //0 is grass 1 is dirt
   function getName(x, y) {
  let l = arr[y][x-1] === 1,
      t = arr[y-1] && arr[y-1][x] === 1,
      r = arr[y][x+1] === 1,
      b = arr[y+1] && arr[y+1][x] === 1,
      tl = arr[y - 1] && arr[y - 1][x - 1] === 1,
      tr = arr[y - 1] && arr[y - 1][x + 1] === 1,
      br = arr[y + 1] && arr[y + 1][x + 1] === 1,
      bl = arr[y + 1] && arr[y + 1][x - 1] === 1;
  return [
    (l & t ? +tl : 0),    +t||0,    (r & t ? +tr : 0),
    +l,                                             +r,
    (l & b ? +bl : 0),    +b||0,    (r & b ? +br : 0)
  ];
}
    var debug = [];
    for (var i = 0; i < arr.length; i++) {
        arr[i].forEach(function(cell, j) {
            if(typeof cell === "object"){
                cell = new PIXI.Sprite(require("./../drawing/shapes.js").rectangle(32,32,"#fff"));
                cell.x = j * 32;
                cell.y = i * 32;
                tiles.addChild(cell)
            } else{
                switch (cell) {
                    case " ":
                    case 0:
                    case 2:
                        
                    break;
                    case 1:
                        //PIXI.loader.resources["assets/tile.png"].texture
                        cell = new PIXI.Sprite(require("./dirt")(getName(j, i)));
                        cell.x = j * 32;
                        cell.y = i * 32;
                        tiles.addChild(cell);
                        break;
                }
            }
        })
    }
};
