/** @type {import('tailwindcss').Config} */

import flowbite from 'flowbite/plugin'
export default {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    flowbite
  ],
  content: ["node_modules/flowbite-react/lib/esm/**/*.js"]
}