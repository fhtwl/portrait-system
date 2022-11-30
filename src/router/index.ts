import { createRouter, createWebHistory } from 'vue-router';

import common from './modules/common';
import portrait from './modules/portrait';

const routes = [...common, ...portrait];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
