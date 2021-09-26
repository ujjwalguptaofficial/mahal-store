const path = require('path');
console.log("path", path.resolve(__dirname, 'bin/'))

// const TajPlugin = require('../src/plugin');
const TajPlugin = require('mahal-webpack-loader/lib/plugin');

const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: "development",
    module: {
        rules: [{
            test: /\.mahal?$/,
            // loader: 'mahal-webpack-loader',
            use: {
                loader: require.resolve('mahal-webpack-loader')
            },
            // use: [
            //     {
            //         loader: path.resolve('./src/index.js')
            //     }],
            exclude: /node_modules/
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        },
        {
            test: /\.css?$/,
            use: [
                'style-loader',
                {
                    loader: require.resolve('css-loader')
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /\.ts?$/,
            use: {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.mahal$/],
                }
            },
            exclude: /node_modules/,
        }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.mahal']
    },
    output: {
        filename: 'bundles.js',
        path: path.resolve(__dirname, 'bin/')
    },
    plugins: [
        new TajPlugin({
            lang: 'ts'
        }),
        new HtmlWebPackPlugin({
            cache: true,
            hash: true,
            template: 'src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        })
    ]
};