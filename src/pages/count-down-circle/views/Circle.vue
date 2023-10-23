<script setup>
import { reactive, computed, onMounted, ref } from 'vue';

const svgWidth = 400;
const lineWidth= 20;


// d="M cx cy A rx ry 0 1 0 cx cy"
const radius = (svgWidth-lineWidth) /2
const progress=ref(0);

const fixedProgress = computed(()=>{
  return Math.max(Math.min(100, progress.value), 0);

})
const deg = computed(()=> {
  return (2 * Math.PI * (fixedProgress.value - 0.1)) / 100;
})

// 进度条轨道路径
const backPath = computed(()=>{
  const sx = svgWidth / 2;
  const sy = lineWidth / 2;
  const dx = svgWidth - lineWidth / 2;
  const dy = svgWidth / 2;
  return `M ${sx} ${sy} A ${radius} ${radius} 0 0 1 ${dx} ${dy} A ${radius} ${radius} 0 1 1 ${sx} ${sy}`;
})

const path = computed(()=>{
  const r = radius;
  const sx = svgWidth / 2;
  const sy = lineWidth / 2;
  const dx = svgWidth / 2 + Math.sin(deg.value) * r;
  const dy = svgWidth / 2 - Math.cos(deg.value) * r;
  const arc = fixedProgress.value>50? 1:0;

  // 0 ${arc} 1。 1 表示顺时针画弧, arc 表示是大角度还是小角度，1表示大角度弧，0表示小角度弧
  return `M ${sx} ${sy} A ${r} ${r} 0 ${arc} 1 ${dx} ${dy}`;
})

onMounted(()=>{
  setInterval(() => {
    progress.value += 0.1;

    if(progress.value>100){
      progress.value=1
    }
  }, 1);
})
</script>
<template>
  <div class="progress-container">
    <svg
      :viewBox="`0 0 ${svgWidth} ${svgWidth}`"
      style="width: 100%; height: 100%"
    >
      <!-- 外层path 是轨道 -->
      <path
        :d="backPath"
        fill="none"
        :stroke-width="lineWidth"
        stroke="#43382e"
      />
      
      <!-- 内层path是进度条 -->
      <path
        class="path"
        :d="path"
        fill="none"
        :stroke-width="lineWidth"
        stroke-linecap="round"
        stroke="#ffc16e"
      />
    </svg>
  </div>
</template>



<style lang="scss" scoped>
.progress-container {
  position: relative;
  z-index: 99;
  .inner-content {
    position: absolute;
    left: 5%;
    right: 5%;
    top: 5%;
    bottom: 5%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.svg-progress {
  stroke: #ffc16e;
  stroke-linecap: round;
  transition: linear 0.6s;
}
</style>
