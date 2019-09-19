//Webpack:
//For dev: webpack-dev-server --progress --colors
//For compile: webpack
module.exports = function(cwd,ptype) {
  if(ptype === "react"){
    return {
        "devtool": "source-map",
        "entry": "./" + cwd + "src/index.jsx",
        "output": {
            "path": require("path").resolve("./" + cwd),
            "filename": cwd + "bundle.js"
        },
         "module": {
    "rules": [
      {
        "test": /\.jsx$/,
        "loader": "babel-loader",
        "query": {
          "presets": ["env","react"]
        }
      }
    ]
  }
    }
  }
  if(ptype === "javascript"){
    return {
      "devtool": "source-map",
      "entry": "./" + cwd + "src/index.ts",
      "output": {
          "path": require("path").resolve("./" + cwd),
          "filename": cwd + "bundle.js"
      },
       "module": {
  "rules": [
    {"test": /\.ts$/,"loader":"awesome-typescript-loader"},
    {
      "test": /\.js$/,
      "loader": "babel-loader",
      "query": {
        "presets": ["env"]
      }
    }
  ]
}
  }
}
  }
