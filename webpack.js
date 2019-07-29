//Webpack:
//For dev: webpack-dev-server --progress --colors
//For compile: webpack
module.exports = function(cwd,ptype) {
  if(ptype === "react"){
    return {
        "devtool": "source-map",
        "entry": "./" + cwd + "scripts/index.jsx",
        "output": {
            "path": require("path").resolve("./" + cwd),
            "filename": cwd + "bundle.js"
        },
         "module": {
    "loaders": [
      {
        "test": /\.jsx$/,
        "loader": "babel-loader",
        "query": {
          "presets": ["es2015","react"]
        }
      }
    ]
  }
    }
  }
  if(ptype === "javascript"){
    return {
      "devtool": "source-map",
      "entry": "./" + cwd + "scripts/index.js",
      "output": {
          "path": require("path").resolve("./" + cwd),
          "filename": cwd + "bundle.js"
      },
       "module": {
  "loaders": [
    {
      "test": /\.js$/,
      "loader": "babel-loader",
      "query": {
        "presets": ["es2015"]
      }
    }
  ]
}
  }
}
  }
