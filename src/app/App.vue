<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script setup>
import { useRootStore } from "@stores/store";
import {provide} from "vue";

const appStoreData = useRootStore();

provide('store', appStoreData);
</script>

<style>
	[v-cloak] {
		display: none;
	}
</style>
