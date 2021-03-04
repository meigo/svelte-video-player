import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import sveltePreprocess from 'svelte-preprocess';
import sveld from 'sveld';

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: 'src/index.js',
  output: [{ file: 'dist/svelte-video-player.js', format: 'iife', name, exports: 'named' }],
  plugins: [
    del({ targets: ['dist/'] }),
    svelte({
      preprocess: sveltePreprocess({
        postcss: {
          plugins: [require('autoprefixer')()],
        },
      }),
    }),
    css({ output: 'svelte-video-player.css' }),
    resolve(),
    commonjs(),
    sveld(),
    terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
