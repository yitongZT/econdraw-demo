module.exports = {
  title: '易通组态示例',
  publicPath: '/',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Econ.Draw.Web',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  runtimeCompiler: true,
  filenameHashing: true,
  lintOnSave: true,
  devServer: {
    host: '0.0.0.0',
    open: true,
    port: 1237,
    compress: true,
  },
  productionSourceMap: false
};