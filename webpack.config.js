
let webpack = require('webpack')

let MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './example/App.js',
	output: {
		filename: 'main.js',
		path: __dirname + '/example'
	},
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							reloadAll: true
						}
					},
					'css-loader',
					{
						loader: 'stylus-loader',
						options: {
							use: [require('autoprefixer-stylus')()]
						}
					}
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
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
		})
	],
	devServer: {
		writeToDisk: true,
		contentBase: './example',
		inline: true,
		hot: true,
		port: 80
	}
}