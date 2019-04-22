const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const resolvedSchema = require('json-schema-loader');
module.exports = env => {
    return {
        mode: 'development',
        entry: env === 'test' ? './test.ts' : './src',
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: env === 'test' ? '[name].js' : "index.js"
        },
        node: {
            fs: 'empty'
        },
        module: {
            rules: [{
                test: /\.ts/,
                loader: "ts-loader",
                options: {
                    configFile: env === 'test' ? 'tsconfig.spec.json' : 'tsconfig.app.json'
                }
            },
            {
                test: /\.json/,
                exclude: /node_modules/,
                loader: resolvedSchema
            }

            ]
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 4201,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new CopyWebpackPlugin([{
                from: 'src/parameters.json',
                to: './parameters.json',
                toType: 'file'
            },
            {
                from: './README.md',
                to: './README.md',
                toType: 'file'
            },
            {
                from: './EquationPi.gif',
                to: './EquationPi.gif',
                toType: 'file'
            },
            {
                from: './cso-pap.jpg',
                to: './cso-pap.jpg',
                toType: 'file'
            }
            ])
        ],

    };
};