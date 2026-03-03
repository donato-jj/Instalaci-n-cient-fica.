import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bio: '#22c55e',
        quantum: '#8b5cf6',
        void: '#1e1b4b',
      },
    },
  },
  plugins: [],
}
export default config
