const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = path.resolve(__dirname, "../dist");
const src = path.resolve(__dirname, "../src");

module.exports = {
    entry: {
        app: path.join(src, "/index.js"),
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: dist,
        filename: 'app/[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ["css-loader","sass-loader", {
                        loader: "postcss-loader",
                        options: {
                            plugins: function(){
                                return [autoprefixer]
                            }
                        }
                    }]
                })
            },{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([dist], {
            root: process.cwd()
        }),
        new HtmlWebpackPlugin({
            filename: path.join(dist, "index.html"),
            template: path.join(src, "index.html")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
    ]
};