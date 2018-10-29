var webpack = require('webpack');
var EmitStatsPlugin = require('./emit-stats-plugin');

//var Uglify = webpack.optimize.UglifyJsPlugin;
var CompressionPlugin = require("compression-webpack-plugin");
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FkEmitAssetsPlugin = require('./fk-emit-assets-plugin');
var Visualizer = require('webpack-visualizer-plugin');
var RouteConfig = require('../routeConfig');
var APP_NAME = process.env.APP_NAME;

var PROD = process.env.NODE_ENV === 'production';
var DEV = !PROD;
var platform = process.env.PLATFORM;

var plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			'BUILD_TYPE': JSON.stringify(process.env.BUILD_TYPE),
			RLV_ENV: JSON.stringify('browser'),
			PLATFORM: JSON.stringify(process.env.PLATFORM)
		},
		__DEV__: DEV,
		__PROD__: PROD
	}),
	new webpack.LoaderOptionsPlugin({
		options: {
			devServer: {
				inline: true
			}
		},
		minimize: true
	})
];
if(!PROD){
	plugins = plugins.concat([
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'app',
		// 	minChunks: 2,
		// 	children: true
		// }),
		// new Uglify({
		// 	comments: false,
		// 	compress: {
		// 		warnings: false,
		// 		conditionals: true,
		// 		unused: true,
		// 		comparisons: true,
		// 		sequences: true,
		// 		dead_code: true,
		// 		evaluate: true,
		// 		if_return: true,
		// 		join_vars: true,
		// 		pure_getters: true,
		// 		screw_ie8: true,
		// 		properties: true
		// 	}
		// }),
		new Visualizer({
			filename: './statistics.html'
		}),
		// new ExtractTextPlugin({
		// 	filename: "bundle.[contenthash:20].css",
		// 	disable: false,
		// 	allChunks: true
		// }),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash:20].css"
		}),
		// new EmitStatsPlugin({
		// 	filename:  platform + '-versions.json'
		// }),
		// new EmitStatsPlugin({
		// 	filename:  platform + '-current.version'
		// }),
		new EmitStatsPlugin({
            filename: platform + '-versions.json'
        }),

        new FkEmitAssetsPlugin({
            fileName: platform + '-current.version',
            preloadConfig: RouteConfig.PRELOAD_CONFIG[APP_NAME]
        })
		// new CompressionPlugin({
		// 		filename: '[path][query]',
		// 		algorithm: "gzip",
		// 		test: /\.js$|\.css$|\.svg$/,
		// })
	]);
}
module.exports = plugins;
