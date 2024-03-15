import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-grey': '#808080',
        'dark-grey': '#333333',
        'dark-yellow': '#FFB612',
        'dark-red': '#dc0a17',
        'dark-green': '#2FC022',
      },
    },
  },
  plugins: [],
}
export default config
