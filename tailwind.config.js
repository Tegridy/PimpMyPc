var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

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
      height: {
        192: '38rem'
      },
      minHeight: {
        '37vh' : '37vh',
        '100vh': '100vh',
        '56': '14rem'},
      maxWidth: {
        '64': '16rem',
        '1/5': '20%',
        '1/2': '50%'
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
      },
      borderColor: {
        'transparent': 'rgba(255, 255, 255, 0)'
      },
      borderWidth: {
        'none': 'none',
        'solid': 'solid'
      },
      borderStyle: {
        'solid': 'solid'
      },
      inset: {
        '2/5': '40%'
      }
    }
  },
  variants: {
    extend: {
      display: ['hover', 'group-hover'],
      scale: ['group-hover'],
      borderColor: ['hover', 'active'],
      borderStyle: ['hover'],
      borderWidth: ['hover', 'active'],
      backgroundColor: ['odd']
    }
  },
  plugins: [
    ({ addUtilities, e, theme, variants }) => {
      let colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      // Replace or Add custom colors
      if(this.theme?.extend?.colors !== undefined){
        colors = Object.assign(colors, this.theme.extend.colors);
      }

      const colorMap = Object.keys(colors)
        .map(color => ({
          [`.border-t-${color}`]: {borderTopColor: colors[color]},
          [`.border-r-${color}`]: {borderRightColor: colors[color]},
          [`.border-b-${color}`]: {borderBottomColor: colors[color]},
          [`.border-l-${color}`]: {borderLeftColor: colors[color]},
        }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
    require('@tailwindcss/forms')
  ],
}
