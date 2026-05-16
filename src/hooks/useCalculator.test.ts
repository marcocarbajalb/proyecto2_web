import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCalculator, type Operator } from './useCalculator'

type Case = { a: string, op: Operator, b: string, expected: string }

const enterSequence = (digits: string, op: Operator, b: string) => {
  const { result } = renderHook(() => useCalculator())
  digits.split('').forEach(d => act(() => result.current.pressDigit(d)))
  act(() => result.current.pressOperator(op))
  b.split('').forEach(d => act(() => result.current.pressDigit(d)))
  act(() => result.current.pressEquals())
  return result
}

describe('useCalculator - operaciones básicas', () => {
  const cases: Case[] = [
    { a: '2', op: '+', b: '3', expected: '5' },
    { a: '9', op: '-', b: '4', expected: '5' },
    { a: '6', op: '*', b: '7', expected: '42' },
    { a: '8', op: '/', b: '2', expected: '4' },
    { a: '10', op: '%', b: '3', expected: '1' },
    { a: '22', op: '/', b: '7', expected: '3.1428571' },
    { a: '5', op: '-', b: '9', expected: 'ERROR' },
    { a: '999999999', op: '+', b: '1', expected: 'ERROR' },
    { a: '5', op: '/', b: '0', expected: 'ERROR' }
  ]

  it.each(cases)('$a $op $b = $expected', ({ a, op, b, expected }) => {
    const result = enterSequence(a, op, b)
    expect(result.current.display).toBe(expected)
  })
})

describe('useCalculator - flujo del display', () => {
  it('muestra resultado intermedio al encadenar operadores', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.pressDigit('1'))
    act(() => result.current.pressOperator('+'))
    act(() => result.current.pressDigit('2'))
    act(() => result.current.pressOperator('+'))
    expect(result.current.display).toBe('3')
    act(() => result.current.pressDigit('3'))
    act(() => result.current.pressEquals())
    expect(result.current.display).toBe('6')
  })

  it('después de un operador el siguiente dígito reemplaza el display', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.pressDigit('5'))
    act(() => result.current.pressOperator('+'))
    expect(result.current.display).toBe('5')
    act(() => result.current.pressDigit('7'))
    expect(result.current.display).toBe('7')
  })

  it('el resultado de la división respeta el límite de 9 caracteres', () => {
    const result = enterSequence('22', '/', '7')
    expect(result.current.display.length).toBe(9)
  })
})
