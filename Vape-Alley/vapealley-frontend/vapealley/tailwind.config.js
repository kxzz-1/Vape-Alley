/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#000000',      // Pure black from your image
        'primary': '#a900a9',         // A deep version of your primary purple
        'primary-hover': '#8e008e',   // A slightly darker shade for hover
        'accent': '#c800c8',           // The lightest purple from your image for highlights
        'neon-purple': '#c800c8',      // The lightest purple for the brand name glow
      },
      keyframes: {
        'text-glow': {
          '0%, 100%': {
            'text-shadow': '0 0 5px rgba(200, 0, 200, 0.4), 0 0 10px rgba(200, 0, 200, 0.3)'
          },
          '50%': {
            'text-shadow': '0 0 8px rgba(200, 0, 200, 0.6), 0 0 15px rgba(200, 0, 200, 0.4)'
          },
        },
        'blob-glow': {
            '0%': { transform: 'translate(0px, 0px) scale(1)' },
            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
            '100%': { transform: 'translate(0px, 0px) scale(1)' },
          }
      },
      animation: {
        'text-glow': 'text-glow 2s infinite alternate',
        'blob-glow': 'blob-glow 8s infinite alternate-reverse',
      },
    },
  },
  plugins: [],
}