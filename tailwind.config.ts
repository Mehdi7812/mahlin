export default {
  content: ['./app/components/**/*.vue', './app/layouts/**/*.vue', './app/pages/**/*.vue', './app/app.vue'],
  theme: {
    extend: {
      colors: {
        cream: '#F2EBE3',
        card: '#FAF6F1',
        cardLight: '#FDFCFA',
        ink: '#3F3A35',
        inkSoft: '#6B635A',
        accent: '#6E523A',
        accentHover: '#4A2E16',
        gold: '#A28466'
      },
      fontFamily: {
        body: ['Vazirmatn', 'system-ui', 'sans-serif'],
        display: ['Lalezar', 'Vazirmatn', 'sans-serif'],
        latin: ['"Bodoni Moda"', 'serif']
      }
    }
  }
};
