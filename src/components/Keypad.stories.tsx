import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Keypad from './Keypad'

const meta: Meta<typeof Keypad> = {
  title: 'Components/Keypad',
  component: Keypad,
  decorators: [(Story) => <div className='calculator'><Story /></div>],
  args: {
    onDigit: fn(),
    onDecimal: fn(),
    onNegate: fn(),
    onOperator: fn(),
    onEquals: fn()
  }
}
export default meta

type Story = StoryObj<typeof Keypad>

export const Default: Story = {}
