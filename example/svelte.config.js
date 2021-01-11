import sveltePreprocess from 'svelte-preprocess';

module.exports = {
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [require('autoprefixer')()],
    },
  }),
};
