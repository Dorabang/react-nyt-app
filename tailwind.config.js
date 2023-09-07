/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-80': '#6D6D6D',
        'gray-font': '#C4C4C4',
        'gray-bg': '#F0F1F4',
        'white-60': '#F2F2F2',
        'main-blue': '#3478F6',
        'sub-blue': '#82B0F4',
        'yellow-star': '#FFB800',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
