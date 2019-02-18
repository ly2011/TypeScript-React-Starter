const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
    webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin({}))
    return webpackConfig
  }
}
