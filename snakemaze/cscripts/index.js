var _abbreviate = require("./math/abbreviate");

var _abbreviate2 = _interopRequireDefault(_abbreviate);

var _grid = require("./entity/grid");

var _grid2 = _interopRequireDefault(_grid);

var _entity = require("./entity/entity");

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create the renderer
var renderer = PIXI.autoDetectRenderer(600, 500);
//Add the canvas to the HTML document
document.body.appendChild(renderer.view);
//Create a container object called the "stage"
PIXI.loader.add("images/machine3.png").load(setup);

function setup() {
  var basicSprites = [PIXI.loader.resources["images/machine3.png"].texture];
  var stage = new PIXI.Container();
  var grid = new _grid2.default(16, 16, stage);
  grid.sprites[0][0].texture = basicSprites[0];
  var x = 0;

  function loop() {
    requestAnimationFrame(loop);
    renderer.render(stage);
  }
  loop();
}
//Tell the "renderer" to "render" the "stage"
