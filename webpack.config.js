var path = require('path');
var cwd = "\\snakemaze";
console.log(__dirname + cwd);
module.exports = {
		"mode":"development",
		"devtool": "source-map",
		"entry": "./" + "snakemaze/" + "src/index.js",
		"output": {
			"path": require("path").resolve("./" + cwd),
			"filename": "bundle.js"
		},
		"resolve": {
			"extensions": ['.js', '.json']
		},
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