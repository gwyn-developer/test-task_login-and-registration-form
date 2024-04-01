import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	// css: {
	// preprocessorOptions: {
	//   scss: {
	//	 additionalData: ' @import "./src/assets/scss/utils/mixins"; ',
	//   },
	// },
	// },

	base: '',

	build: {
		sourcemap: true,
		// cssCodeSplit: false,
		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].js',
				chunkFileNames: 'assets/[name].js',
				assetFileNames: 'assets/[name].[ext]',
				sourcemap: true,
			},
		},
	},

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@app': path.resolve(__dirname, './src/app'),
			'@stores': path.resolve(__dirname, './src/stores'),
			// 'primevue': path.resolve(__dirname, 'node_modules/primevue/dist/index.es.js'),
		},
	},

	publicDir: 'src/static',

	plugins: [vue()],

	// optimizeDeps: {
	//	 include: ['primevue']
	// }
})
