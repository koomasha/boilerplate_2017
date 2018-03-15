const path = require('path');

module.exports = {
	entry: './src/scripts/index.ts',
	module: {
		rules: [{
			use: 'ts-loader',
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: ['.ts', '.js' ]
	},
	output: {
		filename: 'scripts.js',
		path: path.resolve(__dirname, 'www/public')
	}
};