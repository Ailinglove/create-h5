
<script setup>
// import { ref } from 'vue'
const obj = {}

const key = 'a'
Object.defineProperty(obj, key, {
  get: () => {
    console.log('========>', obj[key])
    return obj[key]
  },
  set: (newVal) => {
    console.log('========>', obj[key])
    return newVal
  }
})

const handleDefineProperty = () => {
  obj.a = 'sunll'
}
</script>

<template>
  <div class="swipe w-200px h-100px">
    <img src="http://puui.qpic.cn/media_img/lena/PICmxpdsm_1106_1125/0">
    {{ obj.a }}

    <button @click="handleDefineProperty">
      defineProperty
    </button>
  </div>
</template>

<style lang="scss" >
html {
  -webkit-text-size-adjust: 100%;
  /* 2 */

}

#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;

  .swipe {
    overflow: hidden;
    border: 1px solid red;
  }
}</style>