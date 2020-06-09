
let CssExtract = require('extract-css-chunks-webpack-plugin')
let LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
	stats: 'minimal',
	entry: './example/App.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/example'
	},
	watchOptions: {
		poll: 1000
	},
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: [
					CssExtract.loader,
					'css-loader',
					{
						loader: 'stylus-native-loader',
						options: {
							use: [require('autoprefixer-stylus')()]
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					CssExtract.loader,
					'css-loader'
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		],
	},
	plugins: [
		new LiveReloadPlugin,
		new CssExtract({
			filename: 'bundle.css',
		})
	]
}