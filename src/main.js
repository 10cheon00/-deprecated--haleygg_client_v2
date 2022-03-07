import { createApp } from 'vue';
import { Chart } from "chart.js"
import ChartDatalabels from "chartjs-plugin-datalabels"
import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/nova-alt/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "@/css/reset.css";
import "@/css/responsive-layout.css";
import "@/css/font.css";
import App from './App.vue';
import VueRouter from '@/router/index.js';
import VuexStore from '@/store/store.js';


Chart.register(ChartDatalabels)

const app = createApp(App)
app.use(PrimeVue, { inputStyle: 'filled' })
app.use(VueRouter)
app.use(VuexStore)
app.mount('#app')
