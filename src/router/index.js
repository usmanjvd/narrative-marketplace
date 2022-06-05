import { createRouter, createWebHashHistory } from 'vue-router';

import store from '@/store';
import Orders from '@/views/Orders.vue';
import Auth from '@/components/Auth.vue';
import OrderDetail from '@/components/Orders/Detail.vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/',
    redirect: '/orders',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/orders/:id',
    name: 'OrderDetail',
    component: OrderDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {
      name: 'Home',
    },
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((route) => route.meta.requiresAuth)) {
    return next();
  }

  if (store.state.isUserLoggedIn) {
    next();
  } else {
    next({
      name: 'Auth',
    });
  }

  return null;
});

export default router;
