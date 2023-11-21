/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        // Define your custom gradient classes here
        '.gradient-to-blue-pink': 'linear-gradient(to right, #3490dc, #F06292)',
        '.gradient-to-green-yellow': 'linear-gradient(to right, #4CAF50, #FFC107)',
      },
      utilities: {
        '.display-none': {
          display: 'none',
        },
      },
    },
  },
  plugins: [],
}