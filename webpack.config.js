var ReactStylePlugin = require('react-style-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
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
        new ReactStylePlugin('bundle.css')
    ]
};
