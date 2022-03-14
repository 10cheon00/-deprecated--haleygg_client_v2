import { createRouter, createWebHistory } from 'vue-router'

import ServerApi from "@/api/server/module.js";


const routeOnlyAuthenticatedUser = async (to, from, next) => {
  const response = await ServerApi.requestVerifyToken() || false;
  const isAuthenticated = (response.status == 200)
  if (isAuthenticated) {
    next();
  }
  else {
    next({ name: "401UnauthorizedAccessView" })
  }
}

const routes = [
  {
    name: 'HomeView',
    path: '/',
    component: () => import("@/views/HomeView.vue")
  },
  {
    name: 'PlayerInformationView',
    path: '/user/:playerName',
    component: () => import("@/views/PlayerInformationView.vue"),
    props: true
  },
  {
    name: 'EloRankView',
    path: '/elo-rank/',
    component: () => import("@/views/EloRankView.vue")
  },
  {
    name: 'MapStatisticsView',
    path: '/map/',
    component: () => import("@/views/MapStatisticsView.vue")
  },
  {
    name: 'MatchResultFormView',
    path: '/add-result/',
    component: () => import("@/views/Form/MatchResultFormView.vue"),
    beforeEnter: [routeOnlyAuthenticatedUser]
  },
  {
    name: '401UnauthorizedAccessView',
    path: '/401/',
    component: () => import("@/views/App/App401UnauthorizedAccessView.vue")
  },
  {
    name: '404RedirectView',
    path: '/404/',
    component: () => import("@/views/App/App404RedirectView.vue")
  },
  {
    name: 'ErrorView',
    path: '/error/',
    component: () => import("@/views/App/AppErrorView.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("@/views/App/App404RedirectView.vue")
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});