{
    "devtool": "source-map",
    "entry": "./snakemaze/src/index.ts",
    "output": {
        "path": "./snakemaze",
        "filename":  "snakemaze/bundle.js"
    },
    "module": {
        "rules": [{
            "test": /\.ts$/,
            "loader": "awesome-typescript-loader"
        }, {
            "test": /\.js$/,
            "loader": "babel-loader",
            "query": {
                "presets": ["env"]
            }
        }]
    }
}