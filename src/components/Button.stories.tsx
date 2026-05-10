import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { onClick: () => {} }
}
export default meta

type Story = StoryObj<typeof Button>

export const Number: Story = { args: { label: '7', variant: 'number' } }
export const Operation: Story = { args: { label: '×', variant: 'operation' } }
export const Equals: Story = { args: { label: '=', variant: 'equals' } }
