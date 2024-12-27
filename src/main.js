import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import { PrimeIcons } from '@primevue/core/api';

import 'primeicons/primeicons.css'
import "./style.css";
import "./flags.css";

import AppState from './plugins/appState.js';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import Noir from './presets/Noir.js';

import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';

const pinia = createPinia();

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark',
            cssLayer: false,
        }
    }
});
app.use(PrimeIcons)
app.use(store)
app.use(router)
app.use(pinia)
app.use(AppState);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.component('ThemeSwitcher', ThemeSwitcher);
app.use(PrimeVue).mount('#app');