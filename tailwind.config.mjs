/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      purple: {
        DEFAULT: '#DCB9FF',
        light: '#EDDCFF',
        pale: '#F6EDFF'
      },
      dark: {
        DEFAULT: '#201232',
        light: '#8F8898',
        pale: '#C7C4CC'
      },
      yellow: {
        DEFAULT: '#EEFF55',
        light: '#F4FF95',
        pale: '#FFFFCC'
      },
      neutral: '#F0F0EC',
      light: '#F5F5F5',
      white: '#FFFFFF',
      success: {
        DEFAULT: '#31b46e',
        light: '#55C998',
        pale: '#7BE5B8'
      },
      info: {
        DEFAULT: '#3e7ed2',
        light: '#6185D5',
        pale: '#8BA2E1'
      },
      warning: {
        DEFAULT: '#ffc107',
        light: '#FFCE44',
        pale: '#FFD766'
      },
      danger: {
        DEFAULT: '#de4d40',
        light: '#E96C69',
        pale: '#F08C8A'
      }
    },
    borderWidth: {
      DEFAULT: '1px',
      2: '2px',
      4: '4px'
    },
    borderRadius: {
      sm: '0.125rem' /* 2px */,
      DEFAULT: '0.25rem' /* 4px */,
      lg: '0.5rem' /* 8px */
    },
    screens: {
      sm: '720px',
      lg: '1440px'
    },
    spacing: {
      1: '0.25rem' /* 4px */,
      2: '0.5rem' /* 8px */,
      4: '1rem' /* 16px */,
      8: '2rem' /* 32px */,
      16: '4rem' /* 64px */,
      32: '8rem' /* 128px */,
      64: '16rem' /* 256px */
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.5' }],
      lg: ['1.125rem', { lineHeight: '1.5' }],
      xl: ['1.25rem', { lineHeight: '1.5' }],
      h6: ['1.25rem', { lineHeight: '1.4' }],
      h5: ['1.5rem', { lineHeight: '1.4' }],
      h4: ['2rem', { lineHeight: '1.3' }],
      h3: ['2.5rem', { lineHeight: '1.2' }],
      h2: ['3.5rem', { lineHeight: '1.2' }],
      h1: ['4rem', { lineHeight: '1.2' }]
    },
    container: {
      center: true
    }
  },
  plugins: []
}
