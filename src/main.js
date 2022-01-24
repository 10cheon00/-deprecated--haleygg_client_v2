import { createApp } from 'vue'
import App from './App.vue'

import VueRouter from './router/index.js'
import PrimeVue from 'primevue/config'

import "@/utils/reset.css"
import "@/utils/responsive-layout.css"
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-dark-purple/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App)
app.use(PrimeVue, { ripple: true, inputStyle: 'filled' })
app.use(VueRouter)
app.mount('#app')
