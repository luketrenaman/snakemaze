var path = require('path');
var cwd = "snakemaze/";
module.exports = {
		"mode":"development",
		"devtool": "source-map",
		"entry": "./" + cwd + "src/index.js",
		"output": {
			"path": path.resolve(__dirname, 'dist'),
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