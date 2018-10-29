const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var DEV = process.env.NODE_ENV !== 'production';
var loaders = require('./webpack/loaders');
var plugins = require('./webpack/plugins');
var DEV = process.env.NODE_ENV !== 'production';
var vendorLibs = require('./webpack/vendor');
var PROD = !DEV;

module.exports = {
	mode: DEV ? 'development' : 'production', 
	entry: {
		"app": path.join(__dirname,  'index.js'),
		"f1vendor": Object.keys(vendorLibs.vendor)
	},
    output: {
        path: DEV ?  path.join(__dirname, 'public') :path.join(__dirname, 'build') ,
        filename: !PROD ? "[name].[chunkhash].js" : "[name].bundle.js",
        publicPath:'/public/',
        pathinfo: PROD,
        chunkFilename: !PROD ? "[name].[chunkhash].js" : "[name].bundle.js",
        jsonpFunction:"webpackJsonp"
	},
	resolve: {
        modules: [
            '../common',
            'node_modules',
            'components',
            'actions',
            'states',
            'stores',
            'helpers',
            'utils',
            'images',
            'mocks'
        ],
        alias: {
            common: path.join(__dirname,'packages/common/')
        }
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true,
				uglifyOptions: {
					warnings: false,
					parse: {},
					compress: {},
					mangle: true, // Note `mangle.properties` is `false` by default.
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_fnames: false,
				  }
			})
		],
		runtimeChunk: {
			name: "f0runtime"
		},
		namedModules: true,
		// splitChunks: {
		// 	name: 'app',
		// 	minChunks: 2,
		// 	chunks: 'all'
		// }
		splitChunks: {
			name: true,
			chunks: 'all',
			cacheGroups: {
				vendors: false,
				default: false,
				f1vendor: {
                    chunks: 'all',
                    name: 'f1vendor',
                    test: 'f1vendor',
                    enforce: true
                }
			}
		}
	},
	// module: {
	// 	rules: [
	// 	{
	// 		test: /\.js$/,
	// 		exclude: /node_modules/,
	// 		use: "babel-loader"
	// 	}, {
	// 		test: /\.jsx?$/,
	// 		exclude: /node_modules/,
	// 		use: "babel-loader"
	// 	}]
	// },
	module: {
        rules: loaders
    },
	plugins: plugins,
}