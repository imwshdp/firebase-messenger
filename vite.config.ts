import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			'@Api': path.resolve(__dirname, './src/Api'),
			'@App': path.resolve(__dirname, './src/App'),
			'@Assets': path.resolve(__dirname, './src/Assets'),
			'@Components': path.resolve(__dirname, './src/Components'),
			'@Config': path.resolve(__dirname, './src/Config'),
			'@Containers': path.resolve(__dirname, './src/Containers'),
			'@Pages': path.resolve(__dirname, './src/Pages'),
			'@Router': path.resolve(__dirname, './src/Router'),
			'@Shared': path.resolve(__dirname, './src/Shared'),
			'@Store': path.resolve(__dirname, './src/Store'),
		},
	},
});
