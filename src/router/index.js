import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'HomeView',
    path: '/',
    component: () => import("@/views/HomeView.vue")
  },
  {
    name: 'UserInformationView',
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
];

export default createRouter({
  history: createWebHistory(),
  routes
});