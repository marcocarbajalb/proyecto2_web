import { useState } from 'react'

const MAX_LENGTH = 9

export function useCalculator () {
  const [display, setDisplay] = useState('0')

  const pressDigit = (digit: string) => {
    setDisplay(current => {
      if (current === '0') return digit
      if (current.length >= MAX_LENGTH) return current
      return current + digit
    })
  }

  return { display, pressDigit }
}
