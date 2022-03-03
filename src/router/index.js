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
    {
        name: 'MatchResultFormView',
        path: '/add-result/',
        component: () => import("@/views/MatchResultFormView.vue")
    },
    {
        name: '404RedirectView',
        path: '/404/',
        component: () => import("@/views/App/404RedirectView.vue")
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});