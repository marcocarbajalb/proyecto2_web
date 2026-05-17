import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Button from './Button'

const inKeypad: StoryObj<typeof Button>['decorators'] = [(Story) => (
  <div className='calculator' style={{ width: 320 }}>
    <div className='keypad'>
      <Button label='1' onClick={fn()} />
      <Button label='2' onClick={fn()} />
      <Button label='3' onClick={fn()} />
      <Story />
    </div>
  </div>
)]

const inSlot: StoryObj<typeof Button>['decorators'] = [(Story) => (
  <div style={{ width: 71, padding: 14, background: '#3a3a3c', borderRadius: 12 }}>
    <div style={{ display: 'grid' }}><Story /></div>
  </div>
)]

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { onClick: fn() },
  argTypes: {
    label: { control: 'text', description: 'Texto visible dentro del botón' },
    variant: {
      control: { type: 'radio' },
      options: ['number', 'operation', 'equals', 'special'],
      description: 'Estilo visual según el rol del botón'
    },
    wide: {
      control: 'boolean',
      description: 'Si es true, el botón ocupa 3 columnas del grid'
    },
    onClick: { table: { disable: true } }
  }
}
export default meta

type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: { label: '7', variant: 'number' },
  decorators: inKeypad
}
export const Number: Story = { args: { label: '7', variant: 'number' }, decorators: inSlot }
export const Operation: Story = { args: { label: '×', variant: 'operation' }, decorators: inSlot }
export const Equals: Story = { args: { label: '=', variant: 'equals' }, decorators: inSlot }
export const Special: Story = { args: { label: '±', variant: 'special' }, decorators: inSlot }
export const Wide: Story = { args: { label: '0', wide: true }, decorators: inKeypad }

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
