<template>
	<div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 register">
		<Toast/>

		<div class="text-center mb-5">
			<div class="text-900 text-3xl font-medium mb-3">Регистрация</div>
			<span class="text-600 font-medium line-height-3">У вас уже есть аккаунт?</span>
			<a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/login">Авторизируйтесь!</a>
		</div>

		<div class="mb-5">
			<label 
				for="username" 
				class="block text-900 font-medium mb-2"
			>
				Имя
			</label>
			<InputText 
				id="username" 
				type="text" 
				placeholder="Введите имя" 
				class="w-full mb-3" 
				v-model="username"
				@keyup.enter="$event.target.blur()"
				@keydown.esc="$event.target.blur()"
			/>

			<label 
				for="password" 
				class="block text-900 font-medium mb-2">
				Пароль
			</label>
			<Password 
				id="password" 
				type="password" 
				placeholder="Введите пароль" 
				class="w-full mb-3" 
				promptLabel="ввод пароля"
				weakLabel="Слишком простой"
				mediumLabel="Средняя сложность" 
				strongLabel="Сложный пароль"
				toggleMask 
				v-model="password"
				:inputStyle="{width: '452px'}"
				@keyup.enter="$event.target.blur()"
				@keydown.esc="$event.target.blur()"
			/>
		</div>

		<Button 
			label="Зарегистрироваться" 
			class="w-full" 
			@click="handleRegisterClick"
		/>
	</div>
</template>
	
<script setup>
import {inject, ref} from "vue";
import {useToast} from "primevue/usetoast";
import { useRouter } from "vue-router";

const toast = useToast();
const registerStore = inject('store');
const router = useRouter();

const username = ref(null);
const password = ref(null);

function errorCheck() {
	if (username?.value?.length < 3 && username?.value?.length > 0) {
		toast.add({severity: 'error', summary: 'Ошибка', detail: "Слишком короткое имя!", life: 3000});
		return false;
	} else if (password?.value?.length < 4 && password?.value?.length > 0) {
		toast.add({severity: 'error', summary: 'Ошибка', detail: "Слишком короткий пароль!", life: 3000});
		return false;
	} else if (username.value === null || password.value === null || username?.value?.length === 0 || password?.value?.length === 0) {
		toast.add({severity: 'error', summary: 'Ошибка', detail: "Необходимо указать логин и пароль", life: 3000});
		return false;
	} else {
		return true;
	}
}

async function handleRegisterClick() {
	if (errorCheck()) {
		try {
			const response = await registerStore.register(username.value, password.value);
			if (response.success) {
				toast.add({severity: 'success', summary: 'Вы успешно зарегистрированы!', detail: response.message, life: 3000});

				setTimeout(() => {
					router.push({ name: 'Login' });
				}, 2000);
			} else {
				toast.add({severity: 'error', summary: 'Ошибка', detail: response.message, life: 3000});
			}
		} catch (error) {
			console.error(error);
			toast.add({severity: 'error', summary: 'Ошибка', detail: 'Произошла ошибка при регистрации', life: 3000});
		}
	}
}
</script>

<style lang="scss" scoped>
	[v-cloak] {
		display: none;
	}

	.register {
		display: flex;
		flex-direction: column;
		margin: 250px auto 0 auto;
		max-width: 500px;
	}
</style>