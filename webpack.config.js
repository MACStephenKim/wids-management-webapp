// var webpack = require("webpack");
// var PROD = JSON.parse(process.env.PROD_ENV || '0');
// module.exports = {
//     entry: ['./public/javascripts/app/statusapp.js', './public/javascripts/app/actionapp.js', './public/javascripts/app/app.js', './public/javascripts/app/index.js', './public/javascripts/app/headcountapp.js'],
//     devtool: "source-map",
//     output: {
//         filename: './public/dist/js/bundle.min.js' 
//     },
//     plugins: [
//         new webpack.optimize.UglifyJsPlugin({minimize: true})
//     ],
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//                 query: {
//                     presets: ['es2015']
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 exclude: /node_modules/,
//                 loader: 'style!css'
//             }
//         ],
//     }
// };

// module.exports = {
//     entry: ['./public/javascripts/app/statusapp.js', './public/javascripts/app/actionapp.js', './public/javascripts/app/app.js', './public/javascripts/app/index.js', './public/javascripts/app/headcountapp.js'],
//     output: {
//         filename: './dist/js/bundle.js'
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//                 query: {
//                     presets: ['es2015']
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 exclude: /node_modules/,
//                 loader: 'style!css'
//             }
//         ],
//     }
// };


// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// module.exports = {
//     entry: ['./public/javascripts/app/statusapp'],
//     output: {
//         filename: './dist/css/bundle.js'
//     },
//     plugins: [
//         new ExtractTextPlugin("./dist/css/bundle.min.css"),
//         new OptimizeCssAssetsPlugin()
//     ],
//     module: {
//         loaders: [
//             {
//                 test: /\.css$/,
//                 loader: ExtractTextPlugin.extract("css-loader","style-loader!css-loader"), 
//             }
//         ]
//     }
// };

// var webpack = require("webpack");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// module.exports = {
//     entry: ['./public/javascripts/lib/angular.js', './public/javascripts/lib/ui-bootstrap-tpls-1.3.2.js'],
//     output: {
//         filename: './public/dist/js/vendor.min.js'
//     },
//     plugins: [
//         new ExtractTextPlugin("./public/dist/js/vendor.css"),
//         new webpack.optimize.UglifyJsPlugin({minimize: true})
//     ],
//     module: {
//         loaders: [
//             {
//                 test: /\.css$/,
//                 loader: ExtractTextPlugin.extract("style-loader","css-loader")
//             }
//         ]
//     }
// };


var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: ['./public/javascripts/lib/angular.js', './public/javascripts/lib/ui-bootstrap-tpls-1.3.2.js'],
    output: {
        filename: './public/dist/js/test.js'
    },
    plugins: [
        new ExtractTextPlugin("./public/dist/js/vendor.css"),
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            }
        ]
    }
};


// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// module.exports = {
//     entry: ['./public/javascripts/app/statusapp'],
//     output: {
//         filename: './dist/css/bundle.js'
//     },
//     plugins: [
//         new ExtractTextPlugin("./dist/css/bundle.css"),
//     ],
//     module: {
//         loaders: [
//             {
//                 test: /\.css$/,
//                 loader: ExtractTextPlugin.extract("css-loader","style-loader!css-loader"), 
//             }
//         ]
//     }
// };
