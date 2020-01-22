//Webpack:
//For dev: webpack-dev-server --progress --colors
//For compile: webpack
module.exports = function(cwd, ptype) {
	var config = {
		"mode":"development",
		"devtool": "source-map",
		"entry": "./" + cwd + "src/index.ts",
		"output": {
			"path": require("path").resolve("./" + cwd),
			"filename": cwd + "bundle.js"
		},
		"resolve": {
			"extensions": ['.ts', '.js', '.json']
		},
		"module": {
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
		}
	}
  console.log(cwd)
  console.log(config)
	return config;
}