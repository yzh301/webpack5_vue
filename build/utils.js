/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-10 14:21:27
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-10 14:21:41
 * @FilePath: \webpack5_vue\build\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use strict";
const path = require("path");
const packageConfig = require("../package.json");

exports.createNotifierCallback = () => {
  const notifier = require("node-notifier");

  return (severity, errors) => {
    if (severity !== "error") return;

    const error = errors[0];
    const filename = error.file && error.file.split("!").pop();

    // 跨平台原生消息通知
    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || "",
      // 设置通知显示图标
      icon: path.join(__dirname, "../public/favicon.ico"),
    });
  };
};
