const paths = require("./paths")
const fs = require('fs')

const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = `${paths.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith(".pug"))

module.exports = {
    // Where webpack looks to start building the bundle
    // Откуда начинается сборка
    entry: [paths.src + "/js/index.js"],

    // Where webpack outputs the assets and bundles
    // Куда помещаются файлы сборки
    output: {
        path: paths.build,
        filename: "[name].bundle.js",
        publicPath: "./",
    },

    // Customize the webpack build process
    // Настройки
    plugins: [
        // Removes/cleans build folders and unused assets when rebuilding
        // Удаление/очистка директории для файлов сборки и неиспользуемых ресурсов при повтроном сборке
        new CleanWebpackPlugin(),
        ...PAGES.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page.replace(/\.pug/, ".html")}`,
                }),
        ),
        // Copies files from target to destination folder
        // Копирование статических файлов
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: paths.public,
        //             to: "assets",
        //             globOptions: {
        //                 ignore: ["*.DS_Store"],
        //             },
        //         },
        //     ],
        // }),
    ],

    // Determine how modules within the project are treated
    // Настройка модулей
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            // JavaScript: использовать Babel для транспиляции
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

            // Styles: Inject CSS into the head with source maps
            // Стили: встроить CSS в head с картами источников
            {
                test: /\.(scss|css|sass)$/,
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

            // Images: Copy image files to build folder
            // Изображения: копировать файлы в директорию для файлов сборки
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

            // Fonts and SVGs: Inline files
            // Шрифты и SVG
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inlines" },

            // PUG
            {
                test: /\.pug$/,
                loader: "pug-loader",
            },
        ],
    },
}
