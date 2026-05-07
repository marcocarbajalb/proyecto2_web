import type { Operator } from '../hooks/useCalculator'

export type KeypadProps = {
  onDigit: (d: string) => void
  onDecimal: () => void
  onNegate: () => void
  onOperator: (op: Operator) => void
  onEquals: () => void
}
