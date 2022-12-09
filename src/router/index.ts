import { createRouter, createWebHashHistory } from 'vue-router';

import common from './modules/common';
import portrait from './modules/portrait';

const routes = [...common, ...portrait];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
