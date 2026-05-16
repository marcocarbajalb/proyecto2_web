import '@testing-library/jest-dom/vitest'
import { expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)

const originalError = console.error
console.error = (...args: unknown[]) => {
  const msg = String(args[0] ?? '')
  if (msg.includes('Not implemented: HTMLCanvasElement')) return
  originalError(...args)
}
