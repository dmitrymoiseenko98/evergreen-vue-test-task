import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '../views/NotFound.vue';
import Home from '../views/Home.vue';
import User from '../views/User.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
