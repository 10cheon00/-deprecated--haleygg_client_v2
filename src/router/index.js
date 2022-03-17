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
    name: '401View',
    path: '/401/',
    component: () => import("@/views/App/App401View.vue")
  },
  {
    name: '404View',
    path: '/404/',
    component: () => import("@/views/App/App404View.vue")
  },
  {
    name: '500View',
    path: '/500/',
    component: () => import("@/views/App/App500View.vue")
  },
  {
    name: 'RequestErrorView',
    path: '/error/',
    component: () => import("@/views/App/AppRequestErrorView.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("@/views/App/App404View.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.name == "401View" ||
    to.name == "404View" ||
    to.name == "500View" ||
    to.name == "RequestErrorView") {
    next();
  }
  else {
    const response = await ServerApi.requestHostCheck() || false;
    const isServerLive = (response.status == 200)
    if (isServerLive) {
      next();
    }
    else {
      next({ name: "500View" });
    }
  }
})

export default router