import type { Preview } from '@storybook/react'
import '../src/styles/calculator.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'casio',
      values: [{ name: 'casio', value: '#1a1a1c' }]
    }
  }
}

export default preview
