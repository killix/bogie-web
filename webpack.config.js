var path = require('path'),
    webpack = require('webpack'),
    ReactStylePlugin = require('react-style-webpack-plugin');

module.exports = {
    entry: './src/view.js',
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
            self: '{fetch: function() {}}'
        }),
        new ReactStylePlugin('bundle.css')
    ]
};
