<<<<<<< HEAD
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
=======
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
>>>>>>> b111f4c1401e1429d25ab6018b485429734b847c
