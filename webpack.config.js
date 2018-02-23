const path = require('path')

module.exports = {
	entry: {
		bundle: './app/client/index.js'
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: /src/,
				query: {
					presets: ["es2015"]
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			}, 
			{
				test: /\.s[a|c]ss$/,
				loader: 'style!css!sass'
			}
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public/js')
	}
}
