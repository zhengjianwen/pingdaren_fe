'use strict';
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var Root_Path = path.resolve(__dirname);
// var Build_Path = path.resolve(Root_Path, './build');
var Modules_Path = path.resolve(Root_Path, './node_modules');
var Entry_Path = path.resolve(Root_Path, './entry');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var Glob = require("glob");

var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//用户在本地测试打包项目
var Build_Path = path.resolve(Root_Path, './build');

if ("test" == process.env.PACKAGE_ENV) {
    Build_Path = path.resolve(Root_Path, '../ping-test/hybrid');
}

var plugins = [

    new webpack.DefinePlugin({
        'process.env': {
            PACKAGE_ENV: JSON.stringify(process.env.PACKAGE_ENV),
            NODE_ENV: '"production"'
        }
    }),

    new webpack.ContextReplacementPlugin(
        /moment[\\\/]locale$/,
        /^\.\/(zh-cn|en-gb)$/
    ),

    new CleanWebpackPlugin(
        [Build_Path + '/*'],　 //匹配删除的文件
        {
            root: Build_Path,       　　　　　　　　　　//根目录
            verbose: true,        　　　　　　　　　　//开启在控制台输出信息
            dry: false        　　　　　　　　　　//启用删除文件
        }
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
        filename: 'js/common-[chunkhash:6].js',
        minChunks: 3
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     children: true,
    //     async: 'children-async'
    // }),

    new ExtractTextPlugin({ filename: 'css/[name]-[contenthash:6].css', allChunks: true }),

    new webpack.optimize.UglifyJsPlugin({
        //sourceMap: true,
        compress: {
            warnings: false,
            drop_debugger: true, // 发布时去除debugger语句
            drop_console: true // 发布时去除console语句
        }
    }),

    new HtmlwebpackPlugin({
        template: path.resolve(Root_Path, "./entry/index.html"),
        filename: "index.html",
        chunks: ["common", "index"],
        hash: false,
    }),

    new BundleAnalyzerPlugin({ analyzerPort: 3000 })
]


module.exports = {
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
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: true //css压缩
                            }
                        },
                        'postcss-loader'
                    ],
                    //publicPath: "../"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: true //css压缩
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ],
                    //publicPath: "../"
                })
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 20000,
                        name: "images/[name]-[hash:6].[ext]",
                        //publicPath: "../"
                    }
                }
            },
        ]
    },

    entry: {
        common: ['babel-polyfill', "react","axios", "react-dom", "react-router-dom", "classnames", "prop-types", "immer", "styled-components","lodash",'./lib/common.js'],
        index: "./entry/index.js"
    },

    output: {
        //filename: '[name]/[name].js',
        //chunkFilename: '[name]/[name].js',
        filename: 'js/[name]-[chunkhash:6].js',
        chunkFilename: 'js/[name]-[chunkhash:6].js',
        path: Build_Path,
        publicPath: "./"
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