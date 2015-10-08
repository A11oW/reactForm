var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:8080',
            './js/components/main.js'
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
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
            },
        ]
    },
    postcss: [
        require('autoprefixer-core'),
    ],
    plugins: [
        new ExtractTextPlugin('css/style.css', { allChunks: true }),
    ]
};