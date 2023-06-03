import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    meta: {
      title: '首页',
      renderMenu: false,
      icon: 'CreditCardOutlined',
    },
  },
  {
    path: '/front',
    name: '前端',
    meta: {
      renderMenu: false,
    },
    component: () => import('@/components/layout/FrontView.vue'),
    children: [
      {
        path: '/login',
        name: '登录',
        meta: {
          icon: 'LoginOutlined',
          view: 'blank',
          target: '_blank',
          cacheable: false,
        },
        component: () => import('@/pages/login'),
      },
      {
        path: '/home',
        name: '首页',
        meta: {
          view: 'blank',
        },
        component: () => import('@/pages/home'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      icon: 'CreditCardOutlined',
      renderMenu: false,
      cacheable: false,
    },
    component: () => import('@/pages/Exp404.vue'),
  },
  {
    path: '/hurwicz',
    name: 'hurwicz',
    meta: {
      icon: 'CreditCardOutlined',
      renderMenu: false,
      cacheable: false,
    },
    component: () => import('@/pages/exp9/BUQUEDING/Exp9_Hurwicz/index.vue'),
  },
  {
    path: '/laplace',
    name: 'laplace',
    meta: {
      icon: 'CreditCardOutlined',
      renderMenu: false,
      cacheable: false,
    },
    component: () => import('@/pages/exp9/BUQUEDING/Exp9_LAPLACE/index.vue'),
  },
  {
    path: '/maxmax',
    name: 'maxmax',
    meta: {
      icon: 'CreditCardOutlined',
      renderMenu: false,
      cacheable: false,
    },
    component: () => import('@/pages/exp9/BUQUEDING/Exp9_MAXMAX/index.vue'),
  },
  {
    path: '/maxmin',
    name: 'maxmin',
    meta: {
      icon: 'CreditCardOutlined',
      renderMenu: false,
      cacheable: false,
    },
    component: () => import('@/pages/exp9/BUQUEDING/Exp9_MAXMIN/index.vue'),
  },
  {
    path: '/regret',
    name: 'regret',
    meta: {
      icon: 'CreditCardOutlined',
      renderMenu: false,
      cacheable: false,
    },
    component: () => import('@/pages/exp9/BUQUEDING/Exp9_REGRET/index.vue'),
  },
];

export default routes;
