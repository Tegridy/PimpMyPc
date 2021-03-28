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
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-bg': {
          'from': {
            opacity: '0'
          },
          'to': {
            opacity: '0.5'
          }
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-bg': 'fade-bg 0.3s ease-out'
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
