/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mwBlack: '#000000',
        mwRed: '#b30000',
        mwGreen: '#00a651',
      }
    },
  },
  plugins: [],
}
