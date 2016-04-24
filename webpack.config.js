module.exports = {
  entry: [
    __dirname + "/src/index.js"
  ],
  output: {
    path: __dirname + "/public/js",
    filename: "bundle.js",
    publicpath: "/js/"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: __dirname + "/src",
        loader: 'babel'
      },
      {
        test: /\.(le|c)ss$/,
        loader: "style!css!less"
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: "url-loader?mimetype=image/png"
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
