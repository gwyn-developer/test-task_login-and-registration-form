<template>
	<div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 home">
		<Card>
			<template #title>
				<div class="text-center mb-5">
					<div class="text-900 text-3xl font-medium mb-3">Информация о пользователе</div>
				</div>
			</template>
			<template #content>
				<div class="block text-900 font-medium mb-2">Имя:</div>
				<div 
					id="username" 
					class="w-full mb-5" 
				>
					{{ aboutStore?.userData?.username ? aboutStore.userData.username : "Имя пользователя отсутствует" }}
				</div>
				<div class="block text-900 font-medium mb-2">Описание:</div>
				<div 
					id="username" 
					class="w-full mb-5" 
				>
					{{ aboutStore?.userData?.about ? aboutStore.userData.about : "Описание пользователя отсутствует" }}
				</div>
			</template>

			<template #footer>
				<div class="flex gap-3 mt-1">
					<Button 
						label="Выйти" 
						class="w-full" 
						@click="handleOutClick"
					/>
				</div>
			</template>
		</Card>
	</div>
</template>
	
<script setup>
import {inject} from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const aboutStore = inject('store');

const authToken = localStorage.getItem('authToken');

if (authToken) {
	aboutStore.setAuthData(authToken);
}

if (aboutStore.authData) {
	aboutStore.getInfo();
} else {
	router.push({name: 'Login'})
}

function handleOutClick() {
	localStorage.removeItem('authToken');
	aboutStore.setAuthData(null);

	router.push({name: 'Login'})
}
</script>

<style lang="scss" scoped>
	[v-cloak] {
		display: none;
	}
	.home {
		display: flex;
		flex-direction: column;
		margin: 250px auto 0 auto;
		max-width: 500px;
	}
</style>