import { createWebHistory, createRouter } from 'vue-router';

import Login from '@app/pages/Login.vue';
import Register from '@app/pages/Register.vue';
import About from '@app/pages/About.vue';

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
	{
		path: '/',
		name: 'About',
		component: About,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
	