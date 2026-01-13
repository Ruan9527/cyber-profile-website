/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#050505',
        'cyber-gray': '#2d2d2d',
        'cyber-yellow': '#fcee0a',
        'cyber-cyan': '#00f0ff',
        'cyber-red': '#ff003c',
      },
      fontFamily: {
        'cyber': ['Microsoft YaHei', 'Heiti SC', 'sans-serif'],
        'display': ['Orbitron', 'Microsoft YaHei', 'sans-serif'],
        'mono': ['Share Tech Mono', 'Microsoft YaHei', 'monospace'],
      },
      cursor: {
        'tactical': 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M2 2L14 28L18 18L28 14L2 2Z\' fill=\'%2300f0ff\' stroke=\'black\' stroke-width=\'1.5\'/%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E"), auto',
        'target': 'url("data:image/svg+xml,%3Csvg width=\'32\' height=\'32\' viewBox=\'0 0 32 32\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M2 2L11 26L15 16L25 12L2 2Z\' fill=\'%23ff003c\' stroke=\'white\' stroke-width=\'1.5\'/%3E%3Cpath d=\'M15 16L28 28\' stroke=\'%23ff003c\' stroke-width=\'2\'/%3E%3Crect x=\'26\' y=\'26\' width=\'4\' height=\'4\' fill=\'%23fcee0a\' stroke=\'black\'/%3E%3C/svg%3E"), pointer',
      },
      animation: {
        'glitch': 'glitch 2s infinite linear alternate-reverse',
        'glitch-img-1': 'glitch-anim-1 2.5s infinite linear alternate-reverse',
        'glitch-img-2': 'glitch-anim-2 3s infinite linear alternate-reverse',
      },
      keyframes: {
        glitch: {
          '0%': {
            clipPath: 'inset(80% 0 0 0)',
            transform: 'translate(-2px, 2px)',
          },
          '20%': {
            clipPath: 'inset(10% 0 60% 0)',
            transform: 'translate(2px, -2px)',
          },
          '40%': {
            clipPath: 'inset(40% 0 40% 0)',
            transform: 'translate(-2px, 2px)',
          },
          '60%': {
            clipPath: 'inset(80% 0 5% 0)',
            transform: 'translate(2px, -2px)',
          },
          '80%': {
            clipPath: 'inset(10% 0 70% 0)',
            transform: 'translate(-2px, 2px)',
          },
          '100%': {
            clipPath: 'inset(30% 0 30% 0)',
            transform: 'translate(0)',
          },
        },
        'glitch-anim-1': {
          '0%': {
            clipPath: 'inset(20% 0 80% 0)',
            transform: 'translate(-2px, 1px)',
          },
          '20%': {
            clipPath: 'inset(60% 0 10% 0)',
            transform: 'translate(2px, -1px)',
          },
          '40%': {
            clipPath: 'inset(40% 0 50% 0)',
            transform: 'translate(-2px, 2px)',
          },
          '60%': {
            clipPath: 'inset(80% 0 5% 0)',
            transform: 'translate(2px, -2px)',
          },
          '80%': {
            clipPath: 'inset(10% 0 70% 0)',
            transform: 'translate(-1px, 1px)',
          },
          '100%': {
            clipPath: 'inset(30% 0 30% 0)',
            transform: 'translate(1px, -1px)',
          },
        },
        'glitch-anim-2': {
          '0%': {
            clipPath: 'inset(10% 0 60% 0)',
            transform: 'translate(2px, -1px)',
          },
          '20%': {
            clipPath: 'inset(80% 0 5% 0)',
            transform: 'translate(-2px, 2px)',
          },
          '40%': {
            clipPath: 'inset(30% 0 20% 0)',
            transform: 'translate(1px, 1px)',
          },
          '60%': {
            clipPath: 'inset(15% 0 80% 0)',
            transform: 'translate(-1px, -2px)',
          },
          '80%': {
            clipPath: 'inset(55% 0 10% 0)',
            transform: 'translate(2px, 1px)',
          },
          '100%': {
            clipPath: 'inset(40% 0 30% 0)',
            transform: 'translate(-2px, -1px)',
          },
        },
      },
    },
  },
  plugins: [],
}