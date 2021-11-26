"use strict";
const webpack = require("webpack");
Object.defineProperty(exports, "__esModule", { value: true });
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// Add React-specific configuration
function getWebpackConfig(config) {
	var _a;
	config.module.rules.push({
		test: /\.[jt]sx?$/,
		// be sure to include tamagui
		include: /tamagui/,
		use: [
			// optionally thread-loader for significantly faster compile!
			'thread-loader',

			// works nicely alongside esbuild
			'esbuild-loader',

			{
				loader: 'tamagui-loader',
				options: {
					config: 'apps/prova-tamagui/tamagui.config.ts',
					components: ['tamagui'],
					importsWhitelist: ['constants.js', 'colors.js'],
					logTimings: true,
					disableExtraction: process.env.NODE_ENV === 'development',
				},
			},
		]
	}
		, {
			test: /\.(png|jpe?g|gif|webp)$/,
			loader: require.resolve('url-loader'),
			options: {
				limit: 10000,
				name: '[name].[hash:7].[ext]',
			},
		}, {
		test: /\.svg$/,
		oneOf: [
			// If coming from JS/TS file, then transform into React component using SVGR.
			{
				issuer: /\.[jt]sx?$/,
				use: [
					{
						loader: require.resolve('@svgr/webpack'),
						options: {
							svgo: false,
							titleProp: true,
							ref: true,
						},
					},
					{
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: '[name].[hash:7].[ext]',
							esModule: false,
						},
					},
				],
			},
			// Fallback to plain URL loader.
			{
				use: [
					{
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: '[name].[hash:7].[ext]',
						},
					},
				],
			},
		],
	});
	if (config.mode === 'development' && ((_a = config['devServer']) === null || _a === void 0 ? void 0 : _a.hot)) {
		// add `react-refresh/babel` to babel loader plugin
		const babelLoader = config.module.rules.find((rule) => {
			var _a;
			return typeof rule !== 'string' &&
				((_a = rule.loader) === null || _a === void 0 ? void 0 : _a.toString().includes('babel-loader'));
		});
		if (babelLoader && typeof babelLoader !== 'string') {
			babelLoader.options['plugins'] = [
				...(babelLoader.options['plugins'] || []),
				[
					require.resolve('react-refresh/babel'),
					{
						skipEnvCheck: true,
					},
				],
			];
		}
		// add https://github.com/pmmmwh/react-refresh-webpack-plugin to webpack plugin
		config.plugins.push(new ReactRefreshPlugin(), new webpack.DefinePlugin({
			'process.env.TAMAGUI_TARGET': '"web"',
		})
		);
	}
	return config;
}
module.exports = getWebpackConfig;
//# sourceMappingURL=webpack.js.map