//var ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var PROD = process.env.NODE_ENV === 'production';
var babelPlugins = PROD ?  ['transform-react-constant-elements', 'transform-react-inline-elements', 'transform-react-remove-prop-types'] : [];

if(process.env.PROMOTION_ENV === 'prod') {
	babelPlugins.push(
		["react-remove-properties", {"properties": ["data-aid"]}]
	);
}

var loaders  = [
	{
	   test: /\.js$/,
		use: [{
			loader: 'babel-loader',
			options: { 
						presets: [["es2015", { "modules": false }],'react','stage-2'],
						plugins: babelPlugins
					}
		}],
		exclude: /node_modules(?!(\/fk-cp-shared|\/credential-management|\/recyclerlistview|\/rv-*))/
   },
   {
		test: /\.(png|jpg|jpeg|gif|svg)$/,
		use: [
			{
			   loader: 'image-size-loader?name=[name]-[hash:8].[ext]'
			}
		]
	}
];

if(!PROD){
	loaders.push({
		test: /.css$/,
		use: [
			MiniCssExtractPlugin.loader, 'css-loader?modules=true&importLoaders=1&localIdentName=[sha512:hash:base64:6]', 'postcss-loader'
		]
		// use: ExtractTextPlugin.extract({
		//   fallbackLoader: "style-loader",
		//   loader: "css-loader?modules=true&importLoaders=1&localIdentName=[sha512:hash:base64:6]!postcss-loader"
		// })
	});
} else{
	loaders.push({
		test: /.css$/,
		use:[
			{
				loader: 'style-loader',
				query: {
					singleton: true
				}
			},
			{
				loader: 'css-loader',
				query: {
					module: true,
					localIdentName: "[path][name]_[local]_[hash:base64:6]",
					importLoaders: 1

				}
			},
			{
				loader: 'postcss-loader'
			}	
		]
	});
}

module.exports = loaders;

