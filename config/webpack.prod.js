const merge = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: 'app/[name].[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("css/[name].[chunkhash].css")
    ]
});