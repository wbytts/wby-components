import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: './dist/main.js',
  output: {
    file: 'dist/zczy-web-components.min.js',
    format: 'umd',
    // sourcemap: true,
    name: 'zczy-web-components',
  },
  plugins: [
    nodeResolve(), // 解析node模块
    uglify(),
    terser(), // 最小化的构建
  ]
});
