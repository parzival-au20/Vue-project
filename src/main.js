import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import { PrimeIcons } from '@primevue/core/api';
import piniaPersist from 'pinia-plugin-persist';
import ToastService from "primevue/toastservice";


import 'primeicons/primeicons.css'
import "./style.css";
import "./flags.css";


import AppState from './plugins/appState.js';
import ThemeSwitcher from './components/ThemeSwitcher.vue';
import Noir from './presets/Noir.js';

import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#ffffff',
            'purple': '#3f3cbb',
            'midnight': '#121063',
            'metal': '#565584',
            'tahiti': '#3ab7bf',
            'silver': '#ecebff',
            'bubble-gum': '#ff77e9',
            'bermuda': '#78dcca',
          },
    },
    ripple: true,
    zIndex: {
        modal: 1100,        //dialog, drawer
        overlay: 1000,      //select, popover
        menu: 1000,         //overlay menus
        tooltip: 1100       //tooltip
    }
});

app.use(PrimeVue)
app.use(PrimeIcons)
app.use(store)
app.use(router)
app.use(pinia)
app.use(AppState);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);


app.use(pinia);
app.component('ThemeSwitcher', ThemeSwitcher);
app.mount('#app');