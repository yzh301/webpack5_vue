// webpack.base.js 基础配置

const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: path.join(__dirname, "../src/index.js"), // 入口文件
  // 打包出口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路劲
    clean: true, //webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", //打包后文件的公共前缀路径
  },
  module: {
    rules: [
      // 匹配.vue文件
      {
        test: /\.vue$/,
        use: "vue-loader", // 用vue-loader去解析vue文件
      },
      // 匹配.ts文件
      {
        test: /\.ts$/,
        use: "babel-loader",
      },
      // js文件配置
      {
        test: /.(js)$/,
        use: "babel-loader",
      },
      //匹配 css  scss|sass 文件
      {
        test: /\.(css|s[ca]ss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    extensions: [".vue", ".ts", ".js", ".json"],
  },
};
