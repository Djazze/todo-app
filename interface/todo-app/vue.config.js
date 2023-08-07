const { defineConfig } = require('@vue/cli-service');
const { DefinePlugin } = require('webpack');


module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        'process.env': JSON.stringify({ NODE_ENV: 'development' }),
      }),
    ],
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
        // Add other necessary fallbacks here
      }
    }
  }
});
