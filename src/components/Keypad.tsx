import Button from './Button'
import type { Operator } from '../hooks/useCalculator'

type KeypadProps = {
  onDigit: (d: string) => void
  onOperator: (op: Operator) => void
  onEquals: () => void
}
const DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']
const OPS: Operator[] = ['+', '-', '*']
function Keypad ({ onDigit, onOperator, onEquals }: KeypadProps) {
  return (
    <div className='keypad'>
      {DIGITS.map(d => <Button key={d} label={d} onClick={() => onDigit(d)} />)}
      {OPS.map(o => <Button key={o} label={o} variant='operation' onClick={() => onOperator(o)} />)}
      <Button label='=' variant='equals' onClick={onEquals} />
    </div>
  )
}
export default Keypad
