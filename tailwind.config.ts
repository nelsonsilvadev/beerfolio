import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Note: Just playing around with the colors, however, I went mostly with the default colors.
      colors: {
        primary: '#1a2b33',
        secondary: '#f8f9f2',
        current: 'currentColor',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
