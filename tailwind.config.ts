import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f7',
          100: '#d5dde8',
          200: '#adbcd2',
          300: '#8599b9',
          400: '#5d77a1',
          500: '#3a5683',
          600: '#2d4466',
          700: '#1e3050',
          800: '#131f36',
          900: '#0a1628',
          950: '#050b14',
        },
        teal: {
          50: '#edfcf9',
          100: '#d2f7f0',
          200: '#a9efe2',
          300: '#72e2d0',
          400: '#3fcebb',
          500: '#1eb8a5',
          600: '#149486',
          700: '#14776d',
          800: '#155f58',
          900: '#164e49',
          950: '#06302d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
