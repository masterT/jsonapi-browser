import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
      }
    }
  },
  plugins: [
    formsPlugin
  ]
})
