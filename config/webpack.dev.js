const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src/js/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "../docs"),
        filename: "[name].bundle.js",
    },

    module: {
        // Control how source maps are generated
        // Управление созданием карт источников
        devtool: "inline-source-map",

        // Spin up a server for quick development
        // Запуск сервера для разработки
        devServer: {
            historyApiFallback: true,
            contentBase: paths.build,
            open: true,
            compress: true,
            hot: true,
            port: 8080,
        },

        rules: [
            // SASS
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { sourceMap: true, importLoaders: 1 },
                    },
                    { loader: "postcss-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } },
                ],
            },

            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    },
                },
            },

            // TypeScript
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },

            // import images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
            },
        ],
    },

    plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
}
