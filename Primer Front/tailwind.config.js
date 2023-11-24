const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2K': { 'min': "1921px" },
      '2xl': { 'max': '1535px' },
      'xl': { 'max': '1279px' },
      'lg': { 'max': '1023px' },
      'md': { 'max': '767px' },
      'sm': { 'max': '639px' },
      'm': { 'max': '424px' },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      maxWidth: {
        'container': '1488px'
      },
      colors: {
        'dark-purplish-blue': '#111827',
        'greyish-purplish-blue': '#374151',
        'snow-white': '#F9FAFB',
        'brown-green': 'rgba(4, 5, 21, 0.45);',
        'signal-black': 'rgba(51, 51, 51, 0.6);',
        'marengo': '#4B5563',
        'sapphire-blue': '#1F2937'
      },
      boxShadow: {
        'btn': '0px 5px 15px rgba(0, 0, 0, 0.2);',
        'shift': ' 0px 5px 4px rgba(0, 0, 0, 0.15);',
        'share': '0px 5px 10px 0px rgba(17, 24, 39, 0.12);'
      },
      zIndex: {
        '1': '1',
      },
      backgroundImage: {
        'section-gradient': 'linear-gradient(88.91deg, rgba(255, 86, 246, 0.1) 12.22%, rgba(185, 54, 238, 0.1) 38.62%, rgba(59, 172, 226, 0.1) 83.24%, rgba(64, 106, 255, 0.1) 98.64%);',
        'section-gradient-mobile': 'linear-gradient(135deg, rgba(67, 203, 255, 0.1) 0%, rgba(151, 8, 204, 0.1) 100%);',
        'hero-gr': 'linear-gradient(135deg, rgba(255, 255, 255, 0.4524) 0%, rgba(255, 255, 255, 0.78) 100%);'
      },
      spacing: {
        'calculation': 'max(32px, calc((100% - 1424px) / 2))',
        'calculation-mob': 'max(16px, calc((100% - 1424px) / 2))',
      },
      gridTemplateColumns: {
        'sl': '560px 1fr',
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
        'auto-blog': 'repeat(auto-fill, minmax(330px, 1fr))',
        'auto-blog-m': 'repeat(auto-fill, minmax(260px, 1fr))',
        'auto-fill-product': 'repeat(auto-fill, minmax(248px, 1fr))',
        'auto-fill-440': 'repeat(auto-fill, minmax(440px, 1fr))',
        'table-products': 'minmax(320px, 1fr) repeat(3, minmax(130px, 1fr)) repeat(4, minmax(140px, 1fr)) minmax(130px, 1fr)',
        'table-transaction': '704px repeat(4, minmax(140px, 1fr)) minmax(160px, 1fr)'
      },
      transitionTimingFunction: {
        'smoothly-gentle': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      dropShadow: {
        'article': '0px 5px 15px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [
      require("daisyui")
  ],
  daisyui: {
    themes: false,
  }
}
