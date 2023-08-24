module.exports = {
	root: true,
	env: { browser: true, node: true, es2020: true },
	ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
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
		'prettier',
	],
	rules: {
		'no-unused-vars': 'error',
		'no-console': 'warn',
		'no-trailing-spaces': 'error',
		'prefer-const': 'warn',
		indent: ['warn', 2],
		'max-len': ['error', { code: 120 }],
		'comma-dangle': ['error', 'always-multiline'],
		semi: ['error', 'always'],

		'react/react-in-jsx-scope': 'off',
		// 'jsx-closing-tag-location': 'warn',
		// 'jsx-filename-extension': 'error',
		// 'react/jsx-first-prop-new-line': ['warn', 'always'],

		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^react'],
					['^(@|components)(/.*|$)'],
					['^\\u0000'],
					['^'],
					['^\\.'],
					['^.+\\.?(scss)$'],
				],
			},
		],

		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
	},
};
