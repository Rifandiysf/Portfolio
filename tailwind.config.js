/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html","./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Clash: ["ClashDisplay", "sans-serif"],
        ClashVariable: ["ClashDisplayVariable", "sans-serif"]
      },
      colors: {
        Primary: "#3399FF"
      },
      animation: {
        infiniteScroll: 'infiniteScroll 15s linear infinite',
        shine: 'shine 1s linear infinite',
      },
      keyframes: {
        infiniteScroll: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(-33.33%)'}
        },
        shine: {
          '0%': { backgroundPosition: '100%' },
          '100%': { backgroundPosition: '-100%' },
        },
      }
    },
  },
  plugins: [],
}

