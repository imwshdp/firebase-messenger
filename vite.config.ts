import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@Components': path.resolve(__dirname, './src/Components'),
			'@Containers': path.resolve(__dirname, './src/Containers'),
			'@Assets': path.resolve(__dirname, './src/Assets'),
			'@Shared': path.resolve(__dirname, './src/Shared'),
			'@Store': path.resolve(__dirname, './src/Store'),
			'@Pages': path.resolve(__dirname, './src/Pages'),
			'@App': path.resolve(__dirname, './src/App'),
			'@Router': path.resolve(__dirname, './src/Router'),
			'@Config': path.resolve(__dirname, './src/Config'),
		},
	},
});
