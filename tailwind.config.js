/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend : {
          colors:{
      primaryLight: '#EAE4DD',
      primaryDarker: '#E1D7C6',
      primaryBrown: '#CDC2A5',
      primaryBlue: '#295F98',
    }
    }
  },
  plugins: [],
}

