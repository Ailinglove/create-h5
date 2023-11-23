export default {
  // vue.js
vueTemplate: (name, isUseRouter=false, isAppVue=false)=> `
<script setup>
// import { ref } from 'vue'
</script>

<template>
  ${isUseRouter ? `<RouterView />` : 
  `<div class="${name}">
    ${name}组件
  </div>`}
</template>

<style lang="scss" >
#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>`
,
mainTemplate:(isUseRouter, isUsePinia=false)=>`
import { createApp } from 'vue';
${isUsePinia ? `import { createPinia } from 'pinia';` : ''}
${isUseRouter ? `import router from './router';` : ''}
import App from './App.vue';
import 'uno.css'

import '@common/utils/rem'
import '@common/styles/reset.scss';

const app = createApp(App);
${isUsePinia ? `app.use(createPinia());` : ''}
${isUseRouter ? `app.use(router);` : ''}
app.mount('#app');
`,
routerTemplate:(name)=>`
import { createRouter, createWebHashHistory } from 'vue-router';
import Index from './views/Index.vue';

const router = createRouter({
  history: createWebHashHistory('/h5/activity/vg_activity/${name}'),
  routes: [{
    path: '/',
    component: Index,
  }, {
    path: '/:catchAll(.*)',
    redirect: '/',
  }],
});

export default router;
`
}