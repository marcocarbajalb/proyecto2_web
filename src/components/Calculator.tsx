import Display from './Display'
import Keypad from './Keypad'
import { useCalculator } from '../hooks/useCalculator'

function Calculator () {
  const c = useCalculator()
  return (
    <div className='calculator'>
      <Display value={c.display} />
      <Keypad
        onDigit={c.pressDigit} onDecimal={c.pressDecimal} onNegate={c.pressNegate}
        onOperator={c.pressOperator} onEquals={c.pressEquals}
      />
    </div>
  )
}

export default Calculator
