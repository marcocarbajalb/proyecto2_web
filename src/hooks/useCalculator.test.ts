import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useCalculator } from './useCalculator'

describe('useCalculator', () => {
  it('muestra resultado intermedio al encadenar operadores: 1+2+3 muestra 3 antes del =', () => {
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

  it('muestra ERROR cuando una resta produce un resultado negativo', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.pressDigit('5'))
    act(() => result.current.pressOperator('-'))
    act(() => result.current.pressDigit('9'))
    act(() => result.current.pressEquals())
    expect(result.current.display).toBe('ERROR')
  })

  it('trunca 22/7 a 9 caracteres conservando el punto decimal', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.pressDigit('2'))
    act(() => result.current.pressDigit('2'))
    act(() => result.current.pressOperator('/'))
    act(() => result.current.pressDigit('7'))
    act(() => result.current.pressEquals())
    expect(result.current.display).toBe('3.1428571')
    expect(result.current.display.length).toBe(9)
  })

  it('después de un operador el siguiente dígito reemplaza el display en lugar de concatenarse', () => {
    const { result } = renderHook(() => useCalculator())
    act(() => result.current.pressDigit('5'))
    act(() => result.current.pressOperator('+'))
    expect(result.current.display).toBe('5')
    act(() => result.current.pressDigit('7'))
    expect(result.current.display).toBe('7')
  })
})
