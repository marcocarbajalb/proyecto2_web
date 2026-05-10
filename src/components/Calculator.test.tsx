import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Calculator from './Calculator'

describe('Calculator (integración)', () => {
  it('al hacer click en botones se actualiza el display y se calcula correctamente', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '×' }))
    await user.click(screen.getByRole('button', { name: '7' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(screen.getByRole('status')).toHaveTextContent('56')
  })
})
