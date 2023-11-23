<script setup>
import { LottieAnimation } from "lottie-web-vue"
import LoadingJSON from "./imgs/Animation - 1700710770742.json"

const loadingParams = ref({});

const setTParams = (val)=>{
  loadingParams.value = val;
}

defineExpose({
  setTParams,
})

</script>

<template>
  <div class="h-100%">
    <div class="blank-loading">
      <div class="loading-img">
        <span v-if="loadingParams.title">        
          {{ loadingParams.title }}
        </span>

        <i v-if="loadingParams.type==='tx'" />

        <LottieAnimation
          v-else
          ref="anim"
          :animation-data="LoadingJSON"
          :loop="true"
          :auto-play="true"
          :speed="1"
        />
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
    flex-direction: column;
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
