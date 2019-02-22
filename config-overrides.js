const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addBundleVisualizer,
  addWebpackAlias
} = require('customize-cra')

const path = require('path')

module.exports = override(
  // addDecoratorsLegacy, // 会报错
  // eslint-disable-next-line
  // process.env.BUNDLE_VISUALIZE === 1 && addBundleVisualizer(),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)
