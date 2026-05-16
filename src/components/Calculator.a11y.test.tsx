import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import Calculator from './Calculator'

describe('Calculator - accesibilidad', () => {
  it('no tiene violaciones de WCAG según axe-core', async () => {
    const { container } = render(<Calculator />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
