<script setup>
const src = ref('')
const loadingParams = ref({
  type: 'loading',
  title: '加载中...'
})
const showLoading = ref(true) // 控制loading的显示和隐藏

const data = ref([])
const mockData = ()=>{
  for(let i=0; i<10; i++){
    data.value.push(i)
  }
}
onMounted(() => {
  showLoading.value = true
 // 模拟异步请求
 window.setTimeout(() => {
    mockData()
    showLoading.value = false
  }, 3000)
})  
</script>

<template>
  <div class="box p-20px">
    <div
      v-tloading:[loadingParams]="showLoading"
      class="img-box mt-20px"
    >
      <div
        v-for="item in data"
        :key="item"
        class="h-100px"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style>
.box{
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
