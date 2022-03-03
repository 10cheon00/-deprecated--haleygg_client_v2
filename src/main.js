import { createApp } from 'vue';
import App from './App.vue';
import { Chart } from "chart.js"
import ChartDatalabels from "chartjs-plugin-datalabels"
import PrimeVue from 'primevue/config';
import VueRouter from './router/index.js';
// import VueCookies from "vue-cookies";

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/nova-alt/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/css/reset.css";
import "@/css/responsive-layout.css";
import "@/css/font.css";

Chart.register(ChartDatalabels)

const app = createApp(App)
app.use(PrimeVue, { inputStyle: 'filled' })
app.use(VueRouter)
// app.use(VueCookies)
app.mount('#app')

/*

$cookies.config(
    expireTimes[,
        path[, 
            domain[, 
                secure[, 
                    sameSite
    ]]]
)  
default: 
expireTimes = 1d, 
path = '/', 
domain = '', 
secure = '', 
sameSite = 'Lax'
*/