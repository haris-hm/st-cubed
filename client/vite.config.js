import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, '../', '');
	return {
		plugins: [
			react(),
			tailwindcss(),
		],
		envDir: '../',
		server: {
			proxy: {
				'/api': {
					target: `http://localhost:${env.VITE_BACKEND_PORT}`,
					changeOrigin: true,
					secure: false,
					ws: true,
				},
				'/ws': {
					target: `http://localhost:${env.VITE_BACKEND_PORT}`,
					changeOrigin: true,
					secure: false,
					ws: true,
				},
			},
			hmr: {
				clientPort: 443,
			},
			allowedHosts: [
				// Allow all subdomains of trycloudflare.com
				".trycloudflare.com"
			],
		},
	}
});
