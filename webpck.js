{
		"mode":"production",
		//"devtool": "source-map",
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
			}/*, {
				"test": /\.js$/,
				"loader": "babel-loader",
				"query": {
					"presets": ["env"]
				}
			}*/]
		}
	}