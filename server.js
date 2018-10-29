const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const port = process.env.PORT || 4000;

// start the webpack dev server
const devServer = new WebpackDevServer(webpack(webpackConfig), {
	publicPath: webpackConfig.output.publicPath
});
devServer.listen( port, 'localhost', function () {
	console.log('webpack-dev-server listening on port 4000');
});