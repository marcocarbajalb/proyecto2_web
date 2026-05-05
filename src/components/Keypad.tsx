import Button from './Button'

type KeypadProps = {
  onDigit: (digit: string) => void
}

const DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']

function Keypad ({ onDigit }: KeypadProps) {
  return (
    <div className='keypad'>
      {DIGITS.map(d => (
        <Button key={d} label={d} onClick={() => onDigit(d)} />
      ))}
    </div>
  )
}

export default Keypad
