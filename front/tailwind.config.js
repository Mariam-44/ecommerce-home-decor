/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        bannerImg:"url('src/assets/images/home.jpg')"
      }
    },
    screens:{
      "xl":"1200px"
    }
  },
  plugins: [],
}

