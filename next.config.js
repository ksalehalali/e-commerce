const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");

const nextTranslate = require("next-translate");

module.exports = withPlugins(
  [
    [
      withAntdLess,
      {
        // optional: you can modify antd less variables directly here
        // modifyVars: {  },
        // Or better still you can specify a path to a file
        lessVarsFilePath: "./styles/variables.less",
        // optional
        lessVarsFilePathAppendToEndOfContent: false,
        // optional https://github.com/webpack-contrib/css-loader#object
        cssLoaderOptions: {},

        // Other Config Here...
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    ],
    [nextTranslate, {}],
  ],
  {
    reactStrictMode: false,
    reactDevOverlay: false,
    publicRuntimeConfig: {
      // Will be available on both server and client
      backendUrl: process.env.BACKEND_URL,
    },
    images: {
      domains: ["encrypted-tbn0.gstatic.com", "dashcommerce.click68.com"],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader",
      });
      return config;
    },
  }
);
