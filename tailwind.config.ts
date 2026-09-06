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
        gold: '#A28466',

        // رنگ‌های اضافه‌شده برای طراوت و تنوع بصری
        blush: '#F3B4B0',
        blushLight: '#FCE4E2',
        sage: '#9CBFA0',
        sageLight: '#E3EFE4',
        lilac: '#B9A6DE',
        lilacLight: '#EDE6F8',
        peach: '#F2A868',
        peachLight: '#FBE4CD',
        sky: '#8FC1D9',
        skyLight: '#DFF0F5'
      },
      fontFamily: {
        body: ['Vazirmatn', 'system-ui', 'sans-serif'],
        display: ['Lalezar', 'Vazirmatn', 'sans-serif'],
        latin: ['Vazirmatn', 'system-ui', 'sans-serif']
      }
    }
  }
};