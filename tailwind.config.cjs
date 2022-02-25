module.exports = {
  content: ['./src/app.html', './src/**/*.{svelte,ts}'],
  theme: {
    extend: {
      screens: {
        // Reference https://tailwindcss.com/docs/screens#custom-media-queries
        screen: { raw: 'screen' },
        print: { raw: 'print' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
