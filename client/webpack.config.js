"use strict";

const IS_PROD_BUILD = (process.env.NODE_ENV === 'production');
const CONFIG_FILE = IS_PROD_BUILD ? 'production.js' : 'development.js';
const APP_TARGET = process.env.APP_TARGET || 'WEB';


const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebPackDeployAfterBuild = require('webpack-deploy-after-build');

const deployPath = "./public-assets/";
const buildPath = "./dist/";

function getPlugins() {
    let plugins = [];



    plugins.push(new WebPackDeployAfterBuild({
        from: path.resolve(__dirname, buildPath),
        to: deployPath
    }));

    plugins.push(new CopyWebpackPlugin([
        { from: 'config/' + CONFIG_FILE, to: "../../" + deployPath + 'config/config.js'},
        { from: 'src/html/index.html', to: "../../" + deployPath + 'index.html'}
        // todo : css
    ]));

    return plugins;
}

module.exports = [{

    // https://webpack.js.org/configuration/devtool/
    devtool: IS_PROD_BUILD ? false : "inline-source-map",

    resolve: {
        extensions: [".js", ".json", "jsx", "ts", "tsx"]
    },

    entry:{
        presentation: './src/js/main.js'
    },
    output: {
        path: path.join(__dirname, buildPath + "js"),
        filename: 'presentation.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src/js")
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, "src/ts")
                ],
                loader: 'ts-loader'
            }
        ]
    },

    externals: {
        config: 'CONFIG'
    },

    plugins: getPlugins()

}

];