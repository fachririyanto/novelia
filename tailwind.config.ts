import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-primary': '#00A9FF',
        'app-black': '#3e3e3e',
        'app-font': '#3e3e3e',
        'app-font-gray': '#5e5e5e',
      },
    },
  },
  plugins: [],
}
export default config
