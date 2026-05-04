import { useState } from 'react'
import Button from './components/Button'
import Display from './components/Display'

function App () {
  const [value, setValue] = useState('0')
  return (
    <main>
      <Display value={value} />
      <Button label='1' onClick={() => setValue('1')} />
      <Button label='+' onClick={() => setValue('0')} variant='operation' />
    </main>
  )
}

export default App
