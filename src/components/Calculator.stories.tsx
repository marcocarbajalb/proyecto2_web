import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test'
import Calculator from './Calculator'

const meta: Meta<typeof Calculator> = {
  title: 'Components/Calculator',
  component: Calculator
}
export default meta

type Story = StoryObj<typeof Calculator>

export const Default: Story = {}

export const Demo22Sobre7: Story = {
  name: 'Demo: 22 ÷ 7',
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)
    await userEvent.click(c.getByRole('button', { name: '2' }))
    await userEvent.click(c.getByRole('button', { name: '2' }))
    await userEvent.click(c.getByRole('button', { name: '÷' }))
    await userEvent.click(c.getByRole('button', { name: '7' }))
    await userEvent.click(c.getByRole('button', { name: '=' }))
    await expect(c.getByRole('status')).toHaveTextContent('3.1428571')
  }
}

export const DemoError: Story = {
  name: 'Demo: Estado ERROR',
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)
    await userEvent.click(c.getByRole('button', { name: '5' }))
    await userEvent.click(c.getByRole('button', { name: '−' }))
    await userEvent.click(c.getByRole('button', { name: '9' }))
    await userEvent.click(c.getByRole('button', { name: '=' }))
    await expect(c.getByRole('status')).toHaveTextContent('ERROR')
  }
}
