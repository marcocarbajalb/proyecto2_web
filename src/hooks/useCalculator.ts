import { useState } from 'react'

const MAX_LENGTH = 9
export type Operator = '+' | '-' | '*'

function compute (a: number, b: number, op: Operator): number {
  if (op === '+') return a + b
  if (op === '-') return a - b
  return a * b
}

export function useCalculator () {
  const [display, setDisplay] = useState('0')
  const [accumulator, setAccumulator] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operator | null>(null)
  const [waiting, setWaiting] = useState(false)

  const pressDigit = (digit: string) => {
    if (waiting) {
      setDisplay(digit)
      setWaiting(false)
      return
    }
    setDisplay(current => {
      if (current === '0') return digit
      if (current.length >= MAX_LENGTH) return current
      return current + digit
    })
  }

  const pressOperator = (op: Operator) => {
    const current = Number(display)
    if (accumulator === null || waiting) {
      setAccumulator(current)
    } else if (operator) {
      const result = compute(accumulator, current, operator)
      setAccumulator(result)
      setDisplay(String(result))
    }
    setOperator(op)
    setWaiting(true)
  }

  const pressEquals = () => {
    if (accumulator === null || operator === null) return
    const result = compute(accumulator, Number(display), operator)
    setDisplay(String(result))
    setAccumulator(null)
    setOperator(null)
    setWaiting(true)
  }

  return { display, pressDigit, pressOperator, pressEquals }
}
