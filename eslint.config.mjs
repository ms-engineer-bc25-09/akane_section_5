import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

// この設定が適用されるファイルのパターンを定義し、JavaScriptとTypeScriptの両方に対応する設定
// plugins: { js } は JavaScript 用の ESLint(@eslint/js) プラグインを指定
// extends: ["js/recommended"] は@eslint/jsプラグインに含まれる推奨(recommended)されるルールを適用
// languageOptions: { globals: {...} } では、ブラウザとNode.jsの両方の環境で使用できるようにしている
// tseslint.configs.recommended は TypeScript 用の推奨設定を適用
export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], 
  languageOptions: { globals: {...globals.browser, ...globals.node} } },
  tseslint.configs.recommended,
]);
