const path = require('path')

module.exports = {
	entry: {
		bundle: './app/client/index.js'
	},
	resolve: {
		extensions: ['.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public/js')
	}
}
