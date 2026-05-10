import type { Meta, StoryObj } from '@storybook/react'
import Display from './Display'

const meta: Meta<typeof Display> = {
  title: 'Components/Display',
  component: Display,
  decorators: [(Story) => <div className='calculator'><Story /></div>]
}
export default meta

type Story = StoryObj<typeof Display>

export const Default: Story = { args: { value: '12345' } }
export const Error: Story = { args: { value: 'ERROR' } }
