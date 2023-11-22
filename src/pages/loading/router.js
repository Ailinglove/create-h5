
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory('/h5/activity/vg_activity/loading'),
  routes: [
    {
      path: '/',
      component:() => import('@pages/loading/App.vue'),
    },
    {
      path: '/get',
      component: () => import('@pages/loading/views/GetDetails.vue'),
      meta: {
        title: '获取记录'
      }
    },
    {
      path: '/use',
      component: () => import('@pages/loading/views/UseDetails.vue'),
      meta: {
        title: '消耗记录'
      }
    },
 
  ],
});

export default router;
