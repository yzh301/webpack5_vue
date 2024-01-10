<!--
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-09 16:37:04
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-10 11:02:58
 * @FilePath: \webpack5_vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-09 16:37:04
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-09 16:37:20
 * @FilePath: \webpack5_vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <h2>webpack5-vue3-ts_111121</h2>
  <img :src="smallImg" alt="小于10kb的图片" />
  <img :src="bigImg" alt="大于于10kb的图片" />
  <!-- 小图片背景容器 -->
  <div className='smallImg'></div>
  <!-- 大图片背景容器 -->
  <div className='bigImg'></div>
  <!-- 使用Demo1组件 -->
  <Demo1 />
</template>

<script setup >
import smallImg from '@/assets/imgs/5kb.png'
import bigImg from '@/assets/imgs/22kb.png'
import '@/app.css'
import '@/app.scss'
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
import { Demo1, Demo2 } from '@/components' //引入Demo1和Demo2组件
</script>
<style scoped></style>