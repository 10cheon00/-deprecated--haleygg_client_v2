import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: '/user/:playerName',
    component: () => import("@/views/PlayerInformationView.vue"),
    props: true
  },
  {
    path: '/elo-rank/',
    component: () => import("@/views/EloRankView.vue")
  },
  {
    path: '/map/',
    component: () => import("@/views/MapStatisticsView.vue")
  },
];

export default createRouter({
  history: createWebHistory(),
  routes
});