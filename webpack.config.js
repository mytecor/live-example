
let CssExtract = require('mini-css-extract-plugin')

module.exports = {
	stats: 'minimal',
	entry: './example/App.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/example'
	},
	devServer: {
		contentBase: './',
		publicPath: '/example',
		compress: true,
		port: 80
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
						loader: 'stylus-loader',
						options: {
							stylusOptions: {
								use: [require('autoprefixer-stylus')()]
							}
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: [
						'@babel/react'
					],
					plugins: [
						['@babel/plugin-proposal-class-properties', {'loose': true}],
						'@babel/plugin-proposal-object-rest-spread'
					]
				}
			}
		],
	},
	plugins: [
		new CssExtract({
			filename: 'bundle.css',
		})
	]
}