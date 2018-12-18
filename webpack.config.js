'use strict';
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var Root_Path = path.resolve(__dirname);
var Build_Path = path.resolve(Root_Path, './build');
var Modules_Path = path.resolve(Root_Path, './node_modules');
var Entry_Path = path.resolve(Root_Path, './entry');

var Glob = require("glob");

var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var plugins = [

    new webpack.DefinePlugin({
        'process.env': {
            PACKAGE_ENV: JSON.stringify(process.env.PACKAGE_ENV),
            NODE_ENV: '"development"'
        }
    }),

    new webpack.ContextReplacementPlugin(
        /moment[\\\/]locale$/,
        /^\.\/(zh-cn|en-gb)$/
    ),

    new webpack.ProvidePlugin({
        React: "react",
        _: ["lodash"],
        axios: "axios",
        ClassNames: ["classnames"],
        PropTypes: ["prop-types"],
        Immer: ["immer", "default"],
        Connect: ["react-redux", "connect"],
        Link: ["react-router-dom", "Link"],
        Invoke: ["@/net/invoke.js", "default"],
        History: ["@/entry/browser-history.js", "default"],
        styled: ["styled-components", "default"],
        Common:path.resolve(Root_Path, './lib/common.js')
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.js',
        minChunks: 3
    }),

    new HtmlwebpackPlugin({
        template: path.resolve(Root_Path, "./entry/index.html"),
        filename: "index.html",
        chunks: ["common", "index"],
        hash: true,
    }),

    //new OpenBrowserPlugin({ url: 'http://fe.weizhipin.com:8081/html/hybrid/index' }),

]


module.exports = {
    devtool: /production/.test(process.env.NODE_ENV) ? "" : 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include: [
                //     path.resolve(Root_Path, './entry'),
                //     path.resolve(Root_Path, './js'),
                //     path.resolve(Modules_Path, './swiper'),
                //     path.resolve(Modules_Path, './dom7'),
                // ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['env', 'react', 'stage-0'],
                        "plugins": [
                            "transform-decorators-legacy",
                            ["import",{ "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
                        ]
                    }
                }
            },
            {
                test: /\.css/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            //modules: true,
                            //localIdentName: "[hash:6]"
                            //localIdentName: "[path]--[name]--[local]--[hash:6]"
                            //src-charge-styles---calendar--calendar--0fda07
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 20000,
                        name: "images/[name].[ext]",
                        //publicPath: "../"
                    }
                }
            },
        ]
    },

    entry: {
        common: ['babel-polyfill', "react","axios", "react-dom", "react-router-dom", "classnames", "prop-types", "immer", "styled-components","./js/utils/common",'./lib/common.js'],
        index: "./entry/index.js"
    },

    output: {
        //filename: '[name]/[name].js',
        //chunkFilename: '[name]/[name].js',
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: Build_Path,
        publicPath: "/html/hybrid/"
    },

    devServer: {
        publicPath: '/html/hybrid/',
        compress: false,
        hot: true,
        inline: true,
        contentBase: "./",
        host: '0.0.0.0',
        port: 8085,
        disableHostCheck: true,
        //historyApiFallback: true,
        historyApiFallback: {
            rewrites: [
                { from: "/html/hybrid", to: '/html/hybrid/index.html' }
            ]
            // index: '/html/index.html'
        },

        proxy: {
            "/api": {
                 target:"https://blue-m.weizhipin.com/", //qa
                //target: "http://api.kanzhun-inc.com/mock/66/",
                // target: "http://172.16.26.82:8680/",                 
                //target: "http://172.16.26.9:8480/",                   //赵杰
                pathRewrite: { "^/api": "" },
                secure: false,
                changeOrigin: true,
                //cookieDomainRewrite: {
                //    "dev.weizhipin.com": "blue-boss.weizhipin.com"
                //}
            }
        }
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json', 'css'],
        modules: ["node_modules"],
        alias: {
            '@': path.resolve(__dirname, ''),
            '_common': path.resolve(__dirname, './components/common'),
        }
    },

    plugins: plugins

};

