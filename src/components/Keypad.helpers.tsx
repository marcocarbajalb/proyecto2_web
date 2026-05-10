import Button from './Button'
import type { Operator } from '../hooks/useCalculator'

export const digit = (onDigit: (n: string) => void) => (n: string) =>
  <Button key={n} label={n} onClick={() => onDigit(n)} />

export const oper = (onOp: (o: Operator) => void) => (s: string, o: Operator) =>
  <Button key={o} label={s} variant='operation' onClick={() => onOp(o)} />
