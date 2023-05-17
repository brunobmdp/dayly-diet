/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#1B1D1E',
          200: '#333638',
          300: '#5C6265',
          400: '#B9BBBC',
          500: '#DDDEDF',
          600: '#EFF0F0',
          700: '#FAFAFA',
        },

        white: '#FFFFFF',

        red: {
          light: '#F4E6E7',
          mid: '#F3BABD',
          dark: '#BF3B44',
        },

        green: {
          light: '#E5F0DB',
          mid: '#CBE4B4',
          dark: '#639339',
        },
      },
      fontFamily: {
        nunito_regular: 'NunitoSans_400Regular',
        nunito_bold: 'NunitoSans_700Bold',
      },
      fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
      },
    },
  },
  plugins: [],
}
