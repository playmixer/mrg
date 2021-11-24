// const path = require('path');

module.exports = {
  node: {
    fs: 'empty'
  },
  module: {
    // entry: './src/index.js',
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['source-map-loader', "babel-loader"],
      }, {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, '../static/frontend'),
  // },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
