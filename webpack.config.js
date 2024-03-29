const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const banner = require('./build_helper/licence');
const webpack = require('webpack');


const isDev = process.env.NODE_ENV === "development";
const appName = "mahal-store";
const libraryTarget = [{
    type: "var",
    name: isDev ? `${appName}.js` : `${appName}.min.js`
}, {
    type: "commonjs2",
    name: isDev ? `${appName}.commonjs2.js` : `${appName}.commonjs2.min.js`
}];

function getConfig(target) {
    const baseConfig = {
        entry: './src/index.ts',
        devtool: 'source-map',
        mode: process.env.NODE_ENV,
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            ]
        },
        externals: {
            godam: 'godam',
            mahal: 'mahal',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: target.name,
            library: 'MahalStore',
            libraryTarget: 'umd'
        },
        plugins: [
            new webpack.BannerPlugin(banner),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve('build_helper', 'npm.export.js'), to: '' },
                ],
            }),
        ]
    };

    return baseConfig;
}

var configs = [];
libraryTarget.forEach(function (target) {
    configs.push(getConfig(target));
})
module.exports = configs;