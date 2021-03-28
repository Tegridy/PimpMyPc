module.exports = {
  purge: {
    enabled: process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
    content: [
      "./src/**/*.{html,ts}",
      "./projects/**/*.{html,ts}"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': -10
      },
      minHeight: {
        '37vh' : '37vh'
      }
    }
  },
  variants: {
    extend: {
      display: ['hover', 'group-hover'],
      scale: ['group-hover'],
    }
  },
  plugins: [],
}
