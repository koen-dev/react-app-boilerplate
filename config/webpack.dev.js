const merge = require("webpack-merge");
const common = require("./webpack.common");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    devtool: "source-map",
    devServer: {
        open: true,
        overlay: true
    },
    plugins: [
        new ExtractTextPlugin("css/[name].bundle.css")
    ]
});