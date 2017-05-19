module.exports = [{
    entry: {
        index: './src/index.js'
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
},
{
    entry: {
        app: './src/tests/public/js/index.js'
    },
    output: {
        path: './src/tests/public/js/bin/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
}];
