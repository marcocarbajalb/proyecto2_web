import Button from './components/Button'
import Display from './components/Display'
import { useCalculator } from './hooks/useCalculator'

function App () {
  const { display, pressDigit } = useCalculator()
  return (
    <main>
      <Display value={display} />
      <Button label='1' onClick={() => pressDigit('1')} />
      <Button label='2' onClick={() => pressDigit('2')} />
      <Button label='3' onClick={() => pressDigit('3')} />
    </main>
  )
}

export default App
