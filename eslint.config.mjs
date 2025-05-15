import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([{
    plugins: {
        "@typescript-eslint": typescriptEslint,
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "no-console": "error",

        "import/order": ["error", {
            groups: [
                "type",
                "builtin",
                "object",
                "external",
                "internal",
                "parent",
                "sibling",
                "index",
            ],

            pathGroups: [{
                pattern: "~/**",
                group: "external",
                position: "after",
            }],

            "newlines-between": "always",
        }],
    },
}]);