import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { onClick: fn() }
}
export default meta

type Story = StoryObj<typeof Button>

export const Number: Story = { args: { label: '7', variant: 'number' } }
export const Operation: Story = { args: { label: '×', variant: 'operation' } }
export const Equals: Story = { args: { label: '=', variant: 'equals' } }
export const Special: Story = { args: { label: '±', variant: 'special' } }
export const Wide: Story = { args: { label: '0', wide: true } }

export const AllVariants: Story = {
  render: () => (
    <div className='calculator' style={{ width: 320 }}>
      <div className='keypad'>
        <Button label='7' onClick={fn()} />
        <Button label='±' variant='special' onClick={fn()} />
        <Button label='×' variant='operation' onClick={fn()} />
        <Button label='=' variant='equals' onClick={fn()} />
      </div>
    </div>
  )
}
