<script setup lang="ts">
import { ref } from 'vue';
const tabList = ref([
  { id: 1, text: '获取记录', path: '/get' },
  { id: 2, text: '消耗记录', path: '/use' },
])
const activeIndex = ref(0)
</script>

<template>
  <div class="tabs-box">
    <router-link
      v-for="(item, index) in tabList"
      :key="item.id"
      class="tab-item"
      :to="item.path"
    >
      <span
        class="tab-link"
        :class="{ active: activeIndex === index }"
        @click="activeIndex = index"
      >
        {{ item.text }}
      </span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.tabs-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
  .tab-item {
    padding: 10px;
    &.router-link-active {
      .tab-link {
        transition: border 0.3s;
        color: gold;
        padding-bottom: 5px;
        border-bottom: 2px solid gold;
        &.active {
          border-bottom: 2px solid gold;
          color: gold;
        }
      }
    }
  }
}
</style>
