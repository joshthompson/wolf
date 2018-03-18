const config = require('./webpack.config')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

config.entry = {
	'bundle': './app/client/index.js'
}
config.plugins = [
	new UglifyJsPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	})
]

module.exports = config
