module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'na-green': '#0BDF86',
        'na-gray': '#949494',
        'na-black': '#333333',
        'na-light-green': '#F0FFF9',
        'na-yellow': '#FFAF36',
        'na-red': '#FF4141',
      },
    },
  },
  variants: {
    fill: ['hover'],
    extend: {},
  },
  plugins: [],
};
