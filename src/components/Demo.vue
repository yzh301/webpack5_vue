
<!--
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2024-01-09 16:37:04
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2024-01-09 16:37:20
 * @FilePath: \webpack5_vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="item">
    <el-button type="primary">Primary</el-button>
    <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
    <el-button type="info"><i-ep-InfoFilled />Info</el-button>
    <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
    <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
  </div>
</template>

<script setup >
const count = ref(0)
const doubled = computed(() => count.value * 2)
console.log('🚀 ~ doubled:', doubled)
</script>
<style scoped>
.item {
  width: 200px;
  height: 30px;
}
</style>
