import Button from './Button'
import type { KeypadProps } from './Keypad.types'
import type { Operator } from '../hooks/useCalculator'

const DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']
const OPS: Operator[] = ['+', '-', '*', '/', '%']

export default function Keypad (p: KeypadProps) {
  return (
    <div className='keypad'>
      {DIGITS.map(d => <Button key={d} label={d} onClick={() => p.onDigit(d)} />)}
      <Button label='.' variant='special' onClick={p.onDecimal} />
      {OPS.map(o => <Button key={o} label={o} variant='operation' onClick={() => p.onOperator(o)} />)}
      <Button label='=' variant='equals' onClick={p.onEquals} />
    </div>
  )
}
