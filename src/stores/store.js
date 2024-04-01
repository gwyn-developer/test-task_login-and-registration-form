import { defineStore } from 'pinia';
import { ref } from "vue";
// import { useRouter } from "vue-router";
import axios from "axios";

export const useRootStore = defineStore('rootStore', {
	state: () => ({
		authData: ref(null),
		userData: ref(null),
	}),
	actions: {
		async register(username, password) {
			try {
				const response = await axios.post(`http://localhost:8081/register`, {
					"username": username,
					"password": password,
				});

				if (response.status === 200) {
					return { success: true, message: response.data.message };
				} else {
					return { success: false, message: 'Регистрация не удалась.' };
				}
			} catch (error) {

				if (error.response && error.response.status === 401) {
					console.log('Ошибка 401: Пользователь с таким именем уже зарегистрирован');
					return { success: false, message: 'Пользователь с таким именем уже зарегистрирован' };
				} else {
					console.log(`Ошибка register`, error.response?.data);
					return { success: false, message: `Ошибка при регистрации. ${error.response?.data?.error}` };
				}
			}
		},

		async login(username, password) {
			try {
				const response = await axios.post(`http://localhost:8081/login`, {
					"username": username,
					"password": password,
				});

				if (response.status === 200) {
					this.authData = response.data.token;
					localStorage.setItem('authToken', response.data.token);
					return { success: true, message: 'Успешная авторизация' };
				} else {
					return { success: false, message: 'Неправильные имя пользователя/пароль' };
				}
			} catch (error) {

				if (error.response && error.response.status === 401) {
					console.log('Ошибка 401: Неправильные имя пользователя/пароль');
					return { success: false, message: 'Введите правильные имя пользователя/пароль' };
				} else {
					console.log(`Ошибка login`, error.response?.data);
					return { success: false, message: 'Ошибка при авторизации' };
				}
			}
		},

		async getInfo() {
			try {
				const response = await axios.get(`http://localhost:8081/about`, {
					headers: {'Authorization': `Bearer ${this.authData}`}
				});
				
				if (response.status === 200) {
					this.userData = response.data.data;
					return { success: true, data: response.data.data };
				} else {
					return { success: false, message: 'Не удалось получить информацию о пользователе' };
				}
			} catch (error) {
				if (error.response && error.response.status === 400) {
					console.log('Ошибка 400: Не удалось получить информацию о пользователе');
					return { success: false, message: 'Не удалось получить информацию о пользователе' };
				} else if (error.response && error.response.status === 401) {
					console.log('Ошибка 401: Пользователь не авторизован');
					return { success: false, message: 'Пользователь не авторизован' };
				} else {
					console.log(`ошибка getInfo`, error.response?.data);
					return { success: false, message: 'Ошибка при получении информации о пользователе' };
				}
			}
		},

		setAuthData(value) {
			this.authData = value;
		}
	}
});