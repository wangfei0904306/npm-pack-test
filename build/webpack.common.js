const path = require('path');
const webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.scss',
      '.css',
      '.jsx',
      '.less',
    ],
    alias: {
      pages: path.join(__dirname, '../src/pages/'),
      assets: path.join(__dirname, '../assets/'),
      // 'react': path.join(__dirname, 'node_modules')
    },
    // modules: [path.join(__dirname, '../node_modules')]
  },
  plugins: [
    new ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules')
            ) === 0
        );
      },
    }),
    //   // extract webpack runtime and module manifest to its own file in order to
    //   // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
  ],
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules|bower_components)/,
      use: ['react-hot-loader', 'babel-loader'],
      include: [path.join(projectRoot, 'src'), path.join(projectRoot, 'config')],
    }, {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      use: 'url-loader?limit=100&name=[path][name].[ext]',
    }, {
      test: /\.(ttf|eot|svg|json)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'file-loader?name=[path][name].[ext]',
    }],
  },
  node: {
    fs: 'empty',
    module: 'empty',
  },
};
