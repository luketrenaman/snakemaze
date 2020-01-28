var path = require('path');
var cwd = "snakemaze/";
module.exports = {
		"mode":"production",
		//"devtool": "source-map",
		"entry": "./" + cwd + "src/index.ts",
		"output": {
			"path": path.resolve(__dirname, 'dist'),
			"filename": "bundle.js"
		},
		"resolve": {
			"extensions": ['.ts', '.js', '.json']
		},
		"module": {
			"rules": [{
				"test": /\.ts$/,
				"loader": "ts-loader"
			}/*, {
				"test": /\.js$/,
				"loader": "babel-loader",
				"query": {
					"presets": ["env"]
				}
			}*/]
		}
	}