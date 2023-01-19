const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        short_name: "J.A.T.E.",
        name: "Just Another Text Editor",
        description: "Jot down code snippets with ease!",
        background_color: "#272822",
        display: "standalone",
        theme_color: "#31a9e1",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("/client/favicon.ico"),
            type: "image/icon",
            sizes: 96,
            destination: path.join("assets", "icons"),
            purpose: "any maskable",
          },
          {
            src: path.resolve("/client/src/images/logo.png"),
            type: "image/png",
            sizes: [96, 128, 256, 384, 512],
            destination: path.join("assets", "icons"),
            purpose: "any maskable",
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules|bower_components/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
