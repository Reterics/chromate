//@ts-check
import globals from "globals";

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        plugins: {
            'typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                parser: tseslint.parser,
                project: './tsconfig.app.json',
                extraFileExtensions: ['.vue'],
                sourceType: 'module',
            },
        },
    },
    eslintConfigPrettier
);
