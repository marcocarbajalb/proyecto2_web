import Display from './Display'
import Keypad from './Keypad'
import { useCalculator } from '../hooks/useCalculator'

function Calculator () {
  const calc = useCalculator()
  return (
    <div className='calculator'>
      <Display value={calc.display} />
      <Keypad
        onDigit={calc.pressDigit}
        onDecimal={calc.pressDecimal}
        onOperator={calc.pressOperator}
        onEquals={calc.pressEquals}
      />
    </div>
  )
}

export default Calculator
