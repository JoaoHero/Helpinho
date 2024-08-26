/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        'background-home': "url('/assets/background-home.svg')", // Defina o nome da classe e o caminho da imagem
      },
      screens: {
        'custom': {'min': '767px', 'max': '1023px'},
        'custom2': {'min': '580px', 'max': '767px'},
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-65%)' },
        },
      },
      animation: {
        scroll: 'scroll 16s linear infinite',
      },
    },
  },
  plugins: [],
}

