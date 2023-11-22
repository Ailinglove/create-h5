<script setup>
const src = ref('')
const title = ref('加载中...')
const showLoading = ref(true) // 控制loading的显示和隐藏

onMounted(() => {
  showLoading.value = true
 // 模拟异步请求
 window.setTimeout(() => {
   src.value =
      'https://ms.bdimg.com/pacific/0/pic/-1284887113_-1109246585.jpg?x=0&y=0&h=340&w=510&vh=340.00&vw=510.00&oh=340.00&ow=510.00'
  showLoading.value = false
  }, 1000)
})  
</script>

<template>
  <div class="box">
    <div
      v-myloading:[title]="showLoading"
      class="img-box"
    >
      <img
        :src="src"
        alt=""
      >
    </div>
  </div>
</template>

<style>
.box{
  border: 1px solid red;
  height: 700px;
  position: relative;
}
</style>
