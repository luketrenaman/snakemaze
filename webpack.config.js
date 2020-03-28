const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
		plugins: [
			new BundleAnalyzerPlugin()
		],
		optimization: {
			minimizer: [
			 new TerserPlugin(),
			]
		   }
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