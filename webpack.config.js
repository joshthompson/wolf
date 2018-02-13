const path = require('path');

module.exports = {
	entry: './app/client/index.ts',
	module: {
		rules: [
			{
				test: /app\/client(.*)\.tsx?$/,
				include: /app\/client(.*)\.ts?$/,
				use: 'ts-loader',
				// exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public/js')
	}
};
