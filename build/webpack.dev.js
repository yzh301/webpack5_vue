/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-09 17:06:53
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-10 15:53:05
 * @FilePath: \webpack5_vue\build\webpack.dev.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// webpack.dev.js 开发模式配置
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const DevServerPort = 3000;

const portfinder = require("portfinder");
const utils = require("./utils");
// 合并公共配置,并添加开发环境配置
const devWebpackConfig = merge(baseConfig, {
  mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
  devtool: "eval-cheap-module-source-map", // 源码调试模式,后面会讲
  devServer: {
    port: DevServerPort, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲vue3模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    open: true,
    host: "localhost",
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
  },
  // plugins: [
  //   // new FriendlyErrorsWebpackPlugin({
  //   //   compilationSuccessInfo: {
  //   //     messages: [`您的应用运行在 http://localhost:${DevServerPort}`],
  //   //     notes: ["编译成功┗|｀O′|┛ "],
  //   //   },
  //   //   onErrors: function (severity, errors) {
  //   //     // 您可以监听由插件转换和排序产生的错误
  //   //     // 错误级别可以设置为`错误`或`警告`
  //   //   },
  //   //   // 每次编译时都清空控制台么？
  //   //   // 默认：true
  //   //   clearConsole: true,

  //   //   // 添加格式化方法和转换方法(如下)
  //   //   additionalFormatters: [],
  //   //   additionalTransformers: [],
  //   // }),
  // ],
});
//  处理端口被占用
module.exports = new Promise((resolve, reject) => {
  // 设置默认端口为8080
  portfinder.basePort = process.env.PORT || DevServerPort;
  // 获取没有被占用的端口
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      // 设置启动热更新服务的端口
      devWebpackConfig.devServer.port = port;

      // 启动后根据实际端口再用 FriendlyErrorsWebpackPlugin 插件在终端进行信息展示
      devWebpackConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
            ],
            notes: ["编译成功┗|｀O′|┛ "],
          },
          // 异常处理，使用 node-notifier 进行原生通知
          onErrors: utils.createNotifierCallback(),
          // 默认：true
          clearConsole: true,

          // 添加格式化方法和转换方法(如下)
          additionalFormatters: [],
          additionalTransformers: [],
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
