var path = require('path');
var cwd = "\\snakemaze";
console.log(__dirname + cwd);
module.exports = {
		"mode":"production",
		"entry": "./" + "snakemaze/" + "src/index.js",
		"output": {
			"path": require("path").resolve("./" + cwd),
			"filename": "bundle.js"
		},
		"resolve": {
			"extensions": ['.js', '.json']
		},
		/*optimization: {
			minimizer: [
			 new TerserPlugin(),
			]
		   }*/
		/*"module": {
			"rules": [{
				"test": /\.ts$/,
				"loader": "ts-loader"
			}, {
				"test": /\.js$/,
				"loader": "babel-loader",
				"query": {
					"presets": ["env"]
				}
			}]
		}*/
	}