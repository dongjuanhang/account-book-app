import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import cookie from '@/utils/cookies';

Vue.use(VueRouter);

const files = require.context('./routes', true, /\.ts$/);
const routes: RouteConfig[] = [];

files.keys().forEach((item: string) => {
  routes.push(...files(item).default);
});

const router = new VueRouter({
  routes,
});

router.beforeResolve((to: any, from: any, next: any) => {
  // 未登录拦截
  // if (!!cookie.getCookie('token')) {
  //   next();
  // } else {
  //   if (to.name === 'login') {
  //     next();
  //   } else {
  //     next('/');
  //   }
  // }
  next();
});

export default router;


