var path = require('path'),
    webpack = require('webpack'),
    ReactStylePlugin = require('react-style-webpack-plugin');

module.exports = {
    entry: './src/client.js',
    output: {
        path: path.join(__dirname, 'dist', 'assets'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [
                'babel-loader',
                ReactStylePlugin.loader()
            ]
        }]
    },
    plugins: [
        // HACK: Evite a ReactStylePlugin de crasher
        new webpack.DefinePlugin({
            'self': '{fetch: function() {}}',
            'process.env.BACKEND_URL': process.env.BACKEND_URL
        }),
        new ReactStylePlugin('bundle.css'),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
