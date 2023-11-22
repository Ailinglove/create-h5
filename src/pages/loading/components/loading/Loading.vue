<script setup>
const title = ref('');
const setTitle = (val)=>{
  title.value = val;
}

defineExpose({
  setTitle,
  title
})
</script>

<template>
  <div class="h-100%">
    <div class="blank-loading">
      <div class="loading-img">
        <i />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blank-loading {
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes loading {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 0 -450px;
    }
  }
  .loading-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .loading-img i {
    display: block;
    width: 41px;
    height: 15px;
    background: url(//vm.gtimg.cn/tencentvideo/vstyle/mobile/topic/zipai/style/img/common/loading.png) 0 0 no-repeat;
    background-size: 41px 450px;
    animation: loading 1s steps(30) infinite;
  }
}
</style>
