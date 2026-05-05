import Display from './Display'
import Keypad from './Keypad'
import { useCalculator } from '../hooks/useCalculator'

function Calculator () {
  const { display, pressDigit } = useCalculator()
  return (
    <div className='calculator'>
      <Display value={display} />
      <Keypad onDigit={pressDigit} />
    </div>
  )
}

export default Calculator
