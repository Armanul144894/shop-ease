/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
      },
    },
    extend: {
      colors: {
        primary: '#0f766e',
        accent: '#f97316',
        sand: '#f6efe6',
        ink: '#1f2937',
        mist: '#e8f4f1',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.65s ease forwards',
        shimmer: 'shimmer 2.8s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.08)',
        lift: '0 18px 40px rgba(15, 23, 42, 0.10)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top left, rgba(15, 118, 110, 0.18), transparent 36%), radial-gradient(circle at top right, rgba(249, 115, 22, 0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
}
