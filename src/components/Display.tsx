type DisplayProps = {
  value: string
}

function Display ({ value }: DisplayProps) {
  return (
    <div className='display' role='status' aria-live='polite'>
      {value}
    </div>
  )
}

export default Display
