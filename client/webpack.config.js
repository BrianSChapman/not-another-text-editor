const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new InjectManifest({
        swSrc: './src/src-sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({

        "short_name": 'J.A.T.E.',
        "name": 'Just Another Text Editor',
        "icons": [
          {
            'src': '/client/favicon.ico',
            'type': 'image/icon',
            'sizes': '192x192',
            'purpose': 'any maskable'
          },
          {
            'src': '/client/src/images/logo.png',
            'type': 'image/png',
            'sizes': '512x512',
            'purpose': 'any maskable'
          }
        ],
        'id': '/',
        'start_url': '/',
        'background_color': '#272822',
        'orientation': 'portrait',
        'display': 'standalone',
        'scope': '/',
        'theme_color': '#31a9e1',
        'description': 'Jot down code snippets with ease!'
      })

    ],

    module: {
      rules: [
        
      ],
    },
  };
};
