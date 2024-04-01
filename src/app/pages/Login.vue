<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 login">
        <Toast/>

        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Вход</div>
            <span class="text-600 font-medium line-height-3">У вас еще нет аккаунта?</span>
            <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" href="/register">Зарегистрируйтесь!</a>
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
                toggleMask 
                :feedback="false"
                v-model="password"
                :inputStyle="{width: '452px'}"
                @keyup.enter="$event.target.blur()"
				@keydown.esc="$event.target.blur()"
            />
        </div>

        <Button 
            label="Авторизоваться" 
            class="w-full" 
            @click="handleLoginClick"
        />
    </div>
</template>

<script setup>
import {inject, ref} from "vue";
import {useToast} from "primevue/usetoast";
import { useRouter } from "vue-router";

const toast = useToast();
const loginStore = inject('store');
const router = useRouter();

const username = ref(null);
const password = ref(null);

function errorCheck() {
	if (username.value === null || password.value === null || username?.value?.length === 0 || password?.value?.length === 0) {
		toast.add({severity: 'error', summary: 'Ошибка', detail: "Необходимо указать логин и пароль", life: 3000});
		return false;
	} else {
		return true;
	}
}

async function handleLoginClick() {
	if (errorCheck()) {
		try {
			const response = await loginStore.login(username.value, password.value);
			if (response.success) {
				toast.add({severity: 'success', summary: 'Успех', detail: response.message, life: 3000});
				router.push({ name: 'About' });
			} else {
				toast.add({severity: 'error', summary: 'Ошибка', detail: response.message, life: 3000});
			}
		} catch (error) {
			console.error(error);
			toast.add({severity: 'error', summary: 'Ошибка', detail: 'Произошла ошибка при авторизации', life: 3000});
		}
	}
}
</script>

<style lang="scss" scoped>
    [v-cloak] {
        display: none;
    }

    .login {
        display: flex;
        flex-direction: column;
        margin: 250px auto 0 auto;
        max-width: 500px;
    }
</style>