import Button from './Button'
import type { KeypadProps } from './Keypad.types'
import { digit, oper } from './Keypad.helpers'

export default function Keypad (p: KeypadProps) {
  const D = digit(p.onDigit)
  const O = oper(p.onOperator)
  return (
    <div className='keypad'>
      <Button label='±' ariaLabel='cambiar de signo' variant='special' onClick={p.onNegate} />
      <Button label='.' variant='special' onClick={p.onDecimal} />
      {O('%', '%', 'módulo')}{O('÷', '/', 'dividir')}
      {D('7')}{D('8')}{D('9')}{O('×', '*', 'multiplicar')}
      {D('4')}{D('5')}{D('6')}{O('−', '-', 'restar')}
      {D('1')}{D('2')}{D('3')}{O('+', '+', 'sumar')}
      <Button label='0' wide onClick={() => p.onDigit('0')} />
      <Button label='=' variant='equals' onClick={p.onEquals} />
    </div>
  )
}
