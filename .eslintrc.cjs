module.exports = {
	root: true,
	env: { browser: true, node: true, es2020: true },
	ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: { jsx: true },
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'react-refresh',
		'react-hooks',
		'simple-import-sort',
		'prettier',
	],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	globals: {
		JSX: 'readonly',
	},
	rules: {
		'no-unused-vars': 'warn',
		'no-console': 'warn',
		'no-trailing-spaces': 'error',
		'prefer-const': 'warn',
		'max-len': ['error', { code: 120 }],
		'comma-dangle': ['error', 'always-multiline'],
		indent: ['warn', 'tab'],
		semi: ['error', 'always'],

		'react/react-in-jsx-scope': 'off',
		'react/jsx-closing-tag-location': 'warn',
		'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		// 'react/jsx-first-prop-new-line': ['warn', 'always'],

		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		'simple-import-sort/exports': 'error',
		// 'simple-import-sort/imports': [
		// 	'error',
		// 	{
		// 		groups: [
		// 			['^react'],
		// 			['^(@|components)(/.*|$)'],
		// 			['^\\u0000'],
		// 			['^'],
		// 			['^\\.'],
		// 			['^.+\\.?(scss)$'],
		// 		],
		// 	},
		// ],

		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
	},
};
