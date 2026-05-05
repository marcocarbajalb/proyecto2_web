import Display from './Display'
import Keypad from './Keypad'
import { useCalculator } from '../hooks/useCalculator'

function Calculator () {
  const { display, pressDigit, pressOperator, pressEquals } = useCalculator()
  return (
    <div className='calculator'>
      <Display value={display} />
      <Keypad onDigit={pressDigit} onOperator={pressOperator} onEquals={pressEquals} />
    </div>
  )
}

export default Calculator
