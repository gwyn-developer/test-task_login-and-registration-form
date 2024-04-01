import '@/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@app/App.vue';

import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Card from 'primevue/card';
import Password from 'primevue/password';

import 'primevue/resources/primevue.min.css'; // Основные стили
import 'primevue/resources/themes/aura-dark-blue/theme.css'; // Тема
import 'primeicons/primeicons.css'; // Иконки
import 'primeflex/primeflex.css'; // Утилиты для Flexbox

import router from './router/router';

const app = createApp(App);

app.use(createPinia());

app.use(PrimeVue);
app.use(ToastService)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('ToastService', ToastService)
app.component('Card', Card)
app.component('Password', Password)
app.component('Toast', Toast)

app.use(router);

app.mount('#app');