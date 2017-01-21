'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const libraryName = 'caldera-request-util';

module.exports = {
    target: 'web',
    debug: isDev,
    entry: {

        // Note: entry points must be in arrays to fix a strange bug with webpack
        // See: "A dependency to an entry point is not allowed"
        // https://github.com/webpack/webpack/issues/300
        index: ['./src/LibraryEntryPoint.js']
    },
    context: __dirname,
    devtool: isProduction ? 'cheap-module-source-map' : 'inline-source-map',
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        publicPath: '/lib/',
        path: path.resolve('lib'),
        filename: '[name].js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                presets: ['react']
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: _.compact([
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('dev')
            },
            PROJECT_ROOT: path.join('"', __dirname, '"'),
            'typeof window': JSON.stringify('object')
        }),
        isProduction && new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        isProduction && new webpack.optimize.DedupePlugin()
    ])
};
