import { useState } from 'react'

const MAX_LENGTH = 9
const MAX_VALUE = 999999999
const ERROR = 'ERROR'
export type Operator = '+' | '-' | '*' | '/' | '%'

function compute (a: number, b: number, op: Operator): number {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '*') return a * b
  if (op === '/') return a / b
  return a % b
}

function formatResult (n: number): string {
  if (!isFinite(n) || n < 0 || n > MAX_VALUE) return ERROR
  const cleaned = Number(n.toPrecision(12))
  const str = String(cleaned)
  if (str.length <= MAX_LENGTH) return str
  if (!str.includes('.')) return ERROR
  const intLen = str.indexOf('.')
  if (intLen >= MAX_LENGTH) return ERROR
  return str.slice(0, MAX_LENGTH)
}

export function useCalculator () {
  const [display, setDisplay] = useState('0')
  const [accumulator, setAccumulator] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operator | null>(null)
  const [waiting, setWaiting] = useState(false)

  const reset = () => {
    setAccumulator(null)
    setOperator(null)
    setWaiting(false)
  }

  const pressDigit = (digit: string) => {
    if (display === ERROR) return
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

  const pressDecimal = () => {
    if (display === ERROR) return
    if (waiting) {
      setDisplay('0.')
      setWaiting(false)
      return
    }
    setDisplay(current => {
      if (current.includes('.')) return current
      if (current.length >= MAX_LENGTH) return current
      return current + '.'
    })
  }

  const pressNegate = () => {
    if (display === ERROR || display === '0') return
    setDisplay(current => {
      if (current.startsWith('-')) return current.slice(1)
      if (current.length >= MAX_LENGTH) return current
      return '-' + current
    })
  }

  const pressOperator = (op: Operator) => {
    if (display === ERROR) return
    const current = Number(display)
    if (accumulator !== null && operator !== null && !waiting) {
      const result = compute(accumulator, current, operator)
      const formatted = formatResult(result)
      setDisplay(formatted)
      if (formatted === ERROR) return reset()
      setAccumulator(result)
    } else {
      setAccumulator(current)
    }
    setOperator(op)
    setWaiting(true)
  }

  const pressEquals = () => {
    if (display === ERROR || accumulator === null || operator === null) return
    const result = compute(accumulator, Number(display), operator)
    setDisplay(formatResult(result))
    setAccumulator(null)
    setOperator(null)
    setWaiting(true)
  }

  return { display, pressDigit, pressDecimal, pressNegate, pressOperator, pressEquals }
}
