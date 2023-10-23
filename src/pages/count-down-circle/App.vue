
<script setup>

// import { ref } from 'vue'
const svgWidth=100;
import Circle from './views/Circle.vue'
</script>

<template>
  <div class="count-down-circle">
    count-down-circle组件
    <p>核心思路是用 svg 里边的stroke-width</p>

    <div class="svg-wrap">
      <Circle :progress="50" />

      <svg
        :viewBox="`0 0 ${svgWidth} ${svgWidth}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ffc16e"
          stroke-width="10"
          :style="{
            'stroke-dasharray': '0.8, 0',
          }"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" >
#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
.svg-wrap{
  width: 200px;
  height: 200px;
}
</style>