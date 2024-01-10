/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-09 16:49:36
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-10 17:23:41
 * @FilePath: \webpack5_vue\build\webpack.base.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// webpack.base.js 基础配置

const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const AutoImport = require("unplugin-auto-import/webpack");
const isDev = process.env.NODE_ENV === "development"; // 是否是开发模式/*  */
module.exports = {
  entry: path.join(__dirname, "../src/index.js"), // 入口文件
  // 打包出口文件
  output: {
    filename: "static/js/[name].[chunkhash:8].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路劲
    clean: true, //webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", //打包后文件的公共前缀路径
  },
  module: {
    rules: [
      // 匹配.vue文件
      {
        test: /\.vue$/,
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的vue进行loader解析
        use: ["thread-loader", "vue-loader"], // 用vue-loader去解析vue文件
      },
      // 匹配.ts文件
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的ts进行loader解析
        use: ["thread-loader", "babel-loader"],
      },
      // js文件配置
      {
        test: /.js$/,
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的js进行loader解析
        use: ["thread-loader", "babel-loader"],
      },

      {
        test: /\.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, "../src")],
        exclude: ["/node_modules/element-plus/dist"],
        use: [
          // 开发环境使用style-looader,打包模式抽离css
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ca]ss$/, //匹配所有的 scss 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          // 开发环境使用style-looader,打包模式抽离css
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      // 匹配图片文件
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      // 匹配字体图标文件
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      // 匹配媒体文件
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
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
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new WebpackBar(),
    Components.default({
      // 自定义组件的解析器
      resolvers: [ElementPlusResolver()],
      // 要搜索组件的目录的相对路径
      dirs: ["src/components"],
      // 组件的有效文件扩展名。
      extensions: ["vue", ".ts", ".js", ".mjs"],
      // 搜索子目录
      deep: true,

      // 生成 `components.d.ts` 全局声明，
      // 也接受自定义文件名的路径
      dts: "src/assets/type/components.d.ts",
      // 允许子目录作为组件的命名空间前缀。
      directoryAsNamespace: false,
      // 忽略命名空间前缀的子目录路径
      // 当`directoryAsNamespace: true` 时有效
      globalNamespaces: [],
      // 自动导入指令
      // 默认值：Vue 3 的`true`，Vue 2 的`false`
      // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
      directives: true,
      include: [/.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx?$/, /\.jsx?$/], // 添加对 tsx 和 jsx 文件的支持
      exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
    }),
    AutoImport.default({
      // targets to transform
      include: [
        /\.tsx?$/, // 添加对 tsx 文件的支持
        /\.jsx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/,
      ],

      // global imports to register
      imports: [
        // presets
        "vue",
        "vue-router",
        // custom
      ],
      dts: "src/assets/type/auto-import.d.ts",

      // custom resolvers
      // 可以在这自定义自己的东西，比如接口api的引入，工具函数等等
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
        ElementPlusResolver(),
      ],
    }),
  ],
  resolve: {
    extensions: [".vue", ".ts", ".js", ".json"],
    // 如果用的是pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
    // 查找第三方模块只在本项目的node_modules中查找
    modules: [path.resolve(__dirname, "../node_modules")],
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  stats: "errors-warnings",
};
