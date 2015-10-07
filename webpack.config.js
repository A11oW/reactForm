var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080',
            './js/app/main.js'
        ]
    },
    output: {
        filename: './js/build/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'jsx',
                exclude: /node_modules/
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }

        ]
    },
    postcss: function () {
        return [autoprefixer];
    }
};